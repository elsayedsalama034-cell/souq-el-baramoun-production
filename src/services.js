import {
  collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, writeBatch,
  query, orderBy, where, serverTimestamp, increment, arrayUnion, Timestamp
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebase";

export const PAYMENT_NUMBER = "01064788470";
const EMAIL_DOMAIN = "users.souq-el-baramoun.local";

export function normalizePhone(value = "") {
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const eastern = "۰۱۲۳۴۵۶۷۸۹";
  let s = String(value).trim();
  s = [...s].map(ch => {
    const a = arabic.indexOf(ch); if (a >= 0) return String(a);
    const e = eastern.indexOf(ch); if (e >= 0) return String(e);
    return ch;
  }).join("");
  s = s.replace(/[^0-9+]/g, "");
  if (s.startsWith("+20")) s = "0" + s.slice(3);
  if (s.startsWith("20") && s.length === 12) s = "0" + s.slice(2);
  return s;
}

function authEmail(phone) {
  return `${normalizePhone(phone)}@${EMAIL_DOMAIN}`;
}

export async function registerUser({ name, phone, email, password, role = "advertiser" }) {
  const normalized = normalizePhone(phone);
  if (!/^01[0125][0-9]{8}$/.test(normalized)) throw new Error("رقم الهاتف المصري غير صحيح");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) throw new Error("اكتب بريد جيميل صحيح");
  if (role !== "advertiser") throw new Error("إنشاء الحساب متاح للمشتركين فقط");
  if (password.length < 6) throw new Error("كلمة المرور يجب ألا تقل عن 6 أحرف");
  await setPersistence(auth, browserLocalPersistence);
  const cleanEmail = email.trim().toLowerCase();
  const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid, name, phone: normalized, email: cleanEmail, role,
    active: true, subscriptionStatus: role === "advertiser" ? "inactive" : "none",
    createdAt: serverTimestamp(), updatedAt: serverTimestamp()
  });
  return cred.user;
}

export async function loginUser(email, password) {
  if (!email || !email.includes("@")) throw new Error("اكتب بريدك الإلكتروني");
  await setPersistence(auth, browserLocalPersistence);
  const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  return cred.user;
}

export async function logoutUser() { await signOut(auth); }

export async function changeMyPassword(newPassword) {
  if (!auth.currentUser) throw new Error("يجب تسجيل الدخول أولاً");
  if (!newPassword || newPassword.length < 6) throw new Error("كلمة المرور يجب ألا تقل عن 6 أحرف");
  await updatePassword(auth.currentUser, newPassword);
}

export async function sendPasswordReset(email) {
  if (!email || !email.includes("@")) throw new Error("اكتب بريدك الإلكتروني");
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
}

export async function uploadUserProfileMedia(uid, { avatarFile, coverFile } = {}) {
  if (!uid) throw new Error("المستخدم غير معروف");
  const uploads = {};
  const files = [["avatarUrl", avatarFile], ["coverUrl", coverFile]];
  for (const [field, file] of files) {
    if (!file) continue;
    if (!file.type?.startsWith("image/")) throw new Error("الملف يجب أن يكون صورة");
    if (file.size > 10 * 1024 * 1024) throw new Error("حجم الصورة يجب ألا يتجاوز 10 ميجابايت");
    const path = `profiles/${uid}/${Date.now()}-${field}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type });
    uploads[field] = await getDownloadURL(storageRef);
  }
  if (Object.keys(uploads).length) await updateDoc(doc(db, "users", uid), { ...uploads, updatedAt: serverTimestamp() });
  return uploads;
}

export async function getSellerSocial(uid) {
  if (!uid) return { followers: 0, averageRating: 0, ratingCount: 0, following: false, myRating: 0 };
  const followersSnap = await getDocs(collection(db, "users", uid, "followers"));
  const ratingsSnap = await getDocs(collection(db, "users", uid, "ratings"));
  const meUid = auth.currentUser?.uid;
  let following = false;
  let myRating = 0;
  if (meUid) {
    following = (await getDoc(doc(db, "users", uid, "followers", meUid))).exists();
    const mine = await getDoc(doc(db, "users", uid, "ratings", meUid));
    if (mine.exists()) myRating = Number(mine.data().value || 0);
  }
  const values = ratingsSnap.docs.map(d => Number(d.data().value || 0)).filter(v => v >= 1 && v <= 5);
  return { followers: followersSnap.size, averageRating: values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0, ratingCount: values.length, following, myRating };
}

export async function toggleSellerFollow(uid) {
  const meUid = auth.currentUser?.uid;
  if (!meUid) throw new Error("يجب تسجيل الدخول للمتابعة");
  if (meUid === uid) throw new Error("لا يمكنك متابعة نفسك");
  const r = doc(db, "users", uid, "followers", meUid);
  const existing = await getDoc(r);
  if (existing.exists()) { await deleteDoc(r); return false; }
  await setDoc(r, { userId: meUid, createdAt: serverTimestamp() });
  return true;
}

export async function rateSeller(uid, value) {
  const meUid = auth.currentUser?.uid;
  const n = Number(value);
  if (!meUid) throw new Error("يجب تسجيل الدخول للتقييم");
  if (meUid === uid) throw new Error("لا يمكنك تقييم نفسك");
  if (!Number.isInteger(n) || n < 1 || n > 5) throw new Error("التقييم غير صحيح");
  await setDoc(doc(db, "users", uid, "ratings", meUid), { userId: meUid, value: n, updatedAt: serverTimestamp() });
  return getSellerSocial(uid);
}

export async function fetchPublicSeller(uid) {
  if (!uid) return null;
  const profile = await getUserProfile(uid);
  if (!profile || profile.role !== "advertiser") return null;
  const ads = await fetchMyAds(uid);
  return { ...profile, ads: ads.filter(a => a.status === "approved") };
}

export async function updateUserProfile(uid, data) {
  if (!uid) throw new Error("المستخدم غير معروف");
  const safe = { ...data, updatedAt: serverTimestamp() };
  delete safe.role; delete safe.active; delete safe.subscriptionStatus; delete safe.subscriptionPlan;
  return updateDoc(doc(db, "users", uid), safe);
}

export async function fetchUsers() {
  const snap = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function setUserActive(uid, active) {
  return updateDoc(doc(db, "users", uid), { active: Boolean(active), updatedAt: serverTimestamp() });
}

export async function setSubscriptionActive(uid, active) {
  const userRef = doc(db, "users", uid);
  const adsSnap = await getDocs(query(collection(db, "ads"), where("ownerId", "==", uid)));
  const batch = writeBatch(db);
  batch.update(userRef, { active: Boolean(active), subscriptionStatus: active ? "active" : "inactive", updatedAt: serverTimestamp() });
  adsSnap.docs.forEach(d => batch.update(d.ref, { subscriptionActive: Boolean(active), updatedAt: serverTimestamp() }));
  await batch.commit();
}

export async function expireSubscriptions() {
  const snap = await getDocs(query(collection(db, "users"), where("subscriptionStatus", "==", "active")));
  const now = Date.now();
  const jobs = snap.docs.map(d => {
    const data = d.data();
    const exp = data.subscriptionExpiresAt ? new Date(data.subscriptionExpiresAt).getTime() : 0;
    if (exp && exp <= now) return updateDoc(d.ref, { subscriptionStatus: "expired", active: false, updatedAt: serverTimestamp() });
    return null;
  }).filter(Boolean);
  await Promise.all(jobs);
  return jobs.length;
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createAd(ad, files = []) {
  const user = auth.currentUser;
  if (!user) throw new Error("يجب تسجيل الدخول أولاً");
  const profile = await getUserProfile(user.uid);
  const imageUrls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = `ads/${user.uid}/${Date.now()}-${i}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type });
    imageUrls.push(await getDownloadURL(storageRef));
  }
  return addDoc(collection(db, "ads"), {
    title: ad.title.trim(), price: ad.price || "", category: ad.category,
    categoryName: ad.categoryName || "", city: ad.city.trim(), description: ad.description.trim(),
    images: imageUrls, image: imageUrls[0] || "", ownerId: user.uid,
    seller: profile?.name || user.displayName || "معلن", phone: profile?.phone || "",
    storeName: profile?.storeName || "", address: profile?.address || "", whatsapp: profile?.whatsapp || profile?.phone || "",
    subcategoryName: ad.subcategoryName || "", condition: ad.condition || "",
    status: "pending", subscriptionActive: profile?.subscriptionStatus === "active", subscriptionExpiresAt: profile?.subscriptionExpiresAt || null, featured: false, featuredOrder: 999999, views: 0,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp()
  });
}

export async function createAdOnBehalf(ownerId, ad, files = []) {
  const actor = auth.currentUser;
  if (!actor) throw new Error("يجب تسجيل دخول المدير أولاً");
  const actorProfile = await getUserProfile(actor.uid);
  if (actorProfile?.role !== "admin" || actorProfile?.active !== true) throw new Error("ليس لديك صلاحية تنفيذ هذا الإجراء");
  const ownerProfile = await getUserProfile(ownerId);
  if (!ownerProfile || ownerProfile.role !== "advertiser") throw new Error("اختر مشتركاً صحيحاً");
  const imageUrls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = `ads/${ownerId}/${Date.now()}-${i}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type });
    imageUrls.push(await getDownloadURL(storageRef));
  }
  return addDoc(collection(db, "ads"), {
    title: ad.title.trim(), price: ad.price || "", category: ad.category, categoryName: ad.categoryName || "",
    city: (ad.city || ownerProfile.address || "البرامون").trim(), description: (ad.description || "").trim(),
    images: imageUrls, image: imageUrls[0] || "", ownerId,
    seller: ownerProfile.name || "معلن", phone: ownerProfile.phone || "", storeName: ownerProfile.storeName || "",
    address: ownerProfile.address || "", whatsapp: ownerProfile.whatsapp || ownerProfile.phone || "",
    subcategoryName: ad.subcategoryName || "", condition: ad.condition || "",
    status: ad.status || "pending", subscriptionActive: ownerProfile?.subscriptionStatus === "active", subscriptionExpiresAt: ownerProfile?.subscriptionExpiresAt || null, featured: false, featuredPaid: false, featuredActive: false, featuredOrder: 999999, views: 0,
    createdByAdmin: actor.uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp()
  });
}

export async function fetchAds(includePending = false) {
  const q = query(collection(db, "ads"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(a => includePending || a.status === "approved");
}

export async function fetchFeaturedAds() {
  const q = query(collection(db, "ads"), where("status", "==", "approved"), where("featured", "==", true), where("subscriptionActive", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .filter(a => a.featuredActive !== false)
    .sort((a,b) => Number(a.featuredOrder ?? 999999) - Number(b.featuredOrder ?? 999999));
}

export async function incrementAdViews(id) { return updateDoc(doc(db, "ads", id), { views: increment(1) }); }
export async function updateAd(id, data) { return updateDoc(doc(db, "ads", id), { ...data, updatedAt: serverTimestamp() }); }
export async function removeAd(id) { return deleteDoc(doc(db, "ads", id)); }

export async function createSubscriptionRequest({ plan, amount, transferReference, receiptFile }) {
  const user = auth.currentUser;
  if (!user) throw new Error("يجب تسجيل الدخول أولاً");
  let receiptUrl = "";
  if (receiptFile) {
    const path = `payment-receipts/${user.uid}/${Date.now()}-${receiptFile.name.replace(/[^\w.\-]/g, "_")}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, receiptFile, { contentType: receiptFile.type });
    receiptUrl = await getDownloadURL(storageRef);
  }
  return addDoc(collection(db, "subscriptions"), {
    userId: user.uid, phone: (await getUserProfile(user.uid))?.phone || "",
    plan, amount: String(amount || ""), paymentMethod: "vodafone_cash",
    paymentNumber: PAYMENT_NUMBER, transferReference: transferReference || "",
    receiptUrl, status: "pending", createdAt: serverTimestamp(), updatedAt: serverTimestamp()
  });
}


export async function fetchMyAds(uid) {
  if (!uid) return [];
  const q = query(collection(db, "ads"), where("ownerId", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0));
}

export async function fetchSubscriptions() {
  const q = query(collection(db, "subscriptions"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateSubscription(id, data) {
  return updateDoc(doc(db, "subscriptions", id), { ...data, updatedAt: serverTimestamp() });
}

export async function activateAdvertiser(userId, subscriptionId, plan) {
  const now = new Date();
  const months = plan === "ستة أشهر" ? 6 : plan === "ثلاثة أشهر" ? 3 : 1;
  const expiresAt = new Date(now);
  expiresAt.setMonth(expiresAt.getMonth() + months);
  const expiresTimestamp = Timestamp.fromDate(expiresAt);
  const userRef = doc(db, "users", userId);
  const adsSnap = await getDocs(query(collection(db, "ads"), where("ownerId", "==", userId)));
  const batch = writeBatch(db);
  batch.update(userRef, { active: true, subscriptionStatus: "active", subscriptionPlan: plan, subscriptionStartedAt: serverTimestamp(), subscriptionExpiresAt: expiresTimestamp, updatedAt: serverTimestamp() });
  adsSnap.docs.forEach(d => batch.update(d.ref, { subscriptionActive: true, subscriptionExpiresAt: expiresTimestamp, updatedAt: serverTimestamp() }));
  await batch.commit();
  if (subscriptionId) await updateSubscription(subscriptionId, { status: "approved", activatedAt: serverTimestamp(), expiresAt: Timestamp.fromDate(expiresAt) });
}

export async function rejectSubscription(id, note = "تم رفض طلب الاشتراك") {
  return updateSubscription(id, { status: "rejected", adminNote: note });
}


export async function fetchCategories() {
  const snap = await getDocs(query(collection(db, "categories"), orderBy("order", "asc")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function saveCategory({ id, name, icon = "📦", order = 999 }) {
  const cleanName = String(name || "").trim();
  if (!cleanName) throw new Error("اسم الفئة مطلوب");
  const payload = { name: cleanName, icon, order: Number(order) || 999, updatedAt: serverTimestamp() };
  if (id) return updateDoc(doc(db, "categories", id), payload);
  return setDoc(doc(collection(db, "categories")), { ...payload, createdAt: serverTimestamp() });
}

export async function removeCategory(id) { return deleteDoc(doc(db, "categories", id)); }
export const deleteCategory = removeCategory;
export async function setFeaturedOrder(id, featuredOrder) { return updateDoc(doc(db, "ads", id), { featuredOrder: Number(featuredOrder), updatedAt: serverTimestamp() }); }

export async function createNotification({ userId = "all", title, body, type = "general" }) {
  return addDoc(collection(db, "notifications"), { userId, title: String(title || "إشعار"), body: String(body || ""), type, read: false, createdAt: serverTimestamp() });
}

export async function fetchNotifications(uid) {
  if (!uid) return [];
  const q = query(collection(db, "notifications"), where("userId", "in", [uid, "all"]));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
}

export async function markNotificationRead(id) { return updateDoc(doc(db, "notifications", id), { read: true }); }

export async function notifyUser(userId, title, body, type = "general") { return createNotification({ userId, title, body, type }); }

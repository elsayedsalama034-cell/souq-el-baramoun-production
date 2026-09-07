{tab==="users"&&<div className="admin-panel">
  <h2>إدارة المستخدمين</h2>
  {users.length ? users.map(u=>
    <div className="admin-row" key={u.id}>
      <div>
        <b>{u.name||"بدون اسم"}</b>
        <small>{u.phone||"-"} · {u.role==="advertiser"?"معلن":"زائر"}</small>
        <small>
          {u.subscriptionStatus==="active"
            ?"اشتراك نشط"
            :u.subscriptionStatus==="expired"
            ?"منتهي"
            :"بدون اشتراك"}
        </small>
      </div>

      <span className={u.active?"status":"status muted"}>
        {u.active?"نشط":"موقوف"}
      </span>

      <div className="row-actions">
        {u.role!=="admin"&&
          <>
            <button
              title={u.active?"إيقاف الحساب":"تفعيل الحساب"}
              onClick={()=>toggleUser(u)}
            >
              {u.active?<X size={17}/>:<CheckCircle2 size={17}/>}
            </button>

            {u.role==="advertiser"&&
              <button
                title={u.subscriptionStatus==="active"?"إيقاف الاشتراك":"إعادة تفعيل الاشتراك"}
                onClick={()=>toggleSubscription(u)}
              >
                {u.subscriptionStatus==="active"
                  ?<CreditCard size={17}/>
                  :<CheckCircle2 size={17}/>}
              </button>
            }
          </>
        }
      </div>
    </div>
  ) : <p className="muted-text">لا يوجد مستخدمون بعد.</p>}
</div>}  {tab==="slider"&&<div className="admin-panel"><h2>الإعلانات الذهبية المميزة</h2><p className="muted-text">تحكم كامل في الإعلانات المدفوعة: تقديم، تأخير، إيقاف مؤقت، إعادة تنشيط أو إزالة من الشريط الذهبي والسلايدر.</p>{ads.filter(a=>a.featured).sort((a,b)=>(a.featuredOrder||999999)-(b.featuredOrder||999999)).map((a,i)=><div className="admin-row gold-admin-row" key={a.id}><img src={a.image||a.images?.[0]}/><div><b>{i+1}. {a.title}</b><small>{money(a.price)} · {a.featuredPaid===false?"غير مدفوع":"مدفوع"}</small><small>{a.featuredActive===false?"متوقف مؤقتاً":"نشط في العرض"}</small></div><div className="row-actions"><button title="تقديم" onClick={()=>moveFeatured(a,-1)}>↑</button><button title="تأخير" onClick={()=>moveFeatured(a,1)}>↓</button><button title="إيقاف/تنشيط" onClick={()=>act(a,{featuredActive:a.featuredActive===false?true:false})}>{a.featuredActive===false?<CheckCircle2 size={17}/>:<Pencil size={17}/>}</button><button title="إزالة من المميزة" onClick={()=>act(a,{featured:false,featuredPaid:false,featuredActive:false,featuredOrder:999999})}><X size={17}/></button></div></div>)}</div>}
  {tab==="subs"&&<div className="admin-panel"><h2>طلبات الاشتراك</h2><div className="payment-box"><CreditCard size={35}/><div><b>فودافون كاش فقط</b><p>رقم استقبال التحويلات</p><strong className="payment-number">{PAYMENT_NUMBER}</strong></div></div>{subs.length?subs.map(s=><div className="admin-row sub-row" key={s.id}><div><b>{s.phone||s.userId}</b><small>{s.plan} · {s.amount} جنيه · {s.transferReference||"بدون مرجع"}</small><small>{s.status==="pending"?"قيد المراجعة":s.status==="approved"?"تم التفعيل":"مرفوض"}</small>{s.receiptUrl&&<a href={s.receiptUrl} target="_blank" rel="noreferrer">عرض إيصال التحويل</a>}</div>{s.status==="pending"&&<div className="row-actions"><button onClick={()=>approveSub(s)}><CheckCircle2 size={17}/></button><button className="danger" onClick={()=>rejectSub(s)}><Trash2 size={17}/></button></div>}</div>):<p className="muted-text">لا توجد طلبات اشتراك حالياً.</p>}</div>}
  {tab==="users"&&<div className="admin-panel"><h2>إدارة المستخدمين</h2>{users.length?users.map(u=><div className="admin-row" key={u.id}><div><b>{u.name||"بدون اسم"}</b><small>{u.phone||"-"} · {u.role==="advertiser"?"معلن":"زائر"}</small><small>{u.subscriptionStatus==="active"?"اشتراك نشط":u.subscriptionStatus==="expired"?"منتهي":"بدون اشتراك"}</small></div><span className={u.active?"status":"status muted"}>{u.active?"نشط":"موقوف"}</span><div className="row-actions">{u.role!=="admin"&&<><button title={u.active?"إيقاف الحساب":"تفعيل الحساب"} onClick={()=>toggleUser(u)}>{u.active?<X size={17}/>:<CheckCircle2 size={17}/>}</button>{u.role==="advertiser"&&<button title={u.subscriptionStatus==="active"?"إيقاف الاشتراك":"إعادة تفعيل الاشتراك"} onClick={()=>toggleSubscription(u)}>{u.subscriptionStatus==="active"?<CreditCard size={17}/>:<CheckCircle2 size={17}/>}</button></>}</div></div>):<p className="muted-text">لا يوجد مستخدمون بعد.</p>}</div>}
  {tab==="cats"&&<div className="admin-panel"><h2>إدارة الفئات</h2><div className="category-admin"><div><input value={newCat.icon} onChange={e=>setNewCat({...newCat,icon:e.target.value})} style={{width:55}}/><input value={newCat.name} onChange={e=>setNewCat({...newCat,name:e.target.value})} placeholder="اسم الفئة"/><input value={newCat.order} onChange={e=>setNewCat({...newCat,order:e.target.value})} inputMode="numeric" style={{width:70}}/><button onClick={addCat}><Plus size={17}/></button></div>{cats.map(c=><div key={c.id}><span>{c.icon} {c.name}</span><small>ترتيب {c.order||0}</small><button className="danger" onClick={()=>delCat(c.id)}><Trash2 size={17}/></button></div>)}</div></div>}
  {tab==="notify"&&<div className="admin-panel"><h2>إرسال إشعار</h2><label>المستلم<select value={noteTarget} onChange={e=>setNoteTarget(e.target.value)}><option value="all">كل المستخدمين</option>{users.filter(u=>u.role!=="admin").map(u=><option key={u.id} value={u.id}>{u.name||u.phone||u.id}</option>)}</select></label><label>عنوان الإشعار<input value={noteTitle} onChange={e=>setNoteTitle(e.target.value)} placeholder="مثال: عرض جديد"/></label><label>نص الإشعار<textarea rows="4" value={noteBody} onChange={e=>setNoteBody(e.target.value)} placeholder="اكتب الرسالة"/></label><button className="primary" onClick={sendNote}><Bell size={18}/> إرسال الإشعار</button></div>}
  </div>
}

function ChangePasswordBox(){const [pass,setPass]=useState("");const [confirm,setConfirm]=useState("");const [msg,setMsg]=useState("");const [busy,setBusy]=useState(false);const change=async()=>{setMsg("");if(pass.length<6)return setMsg("كلمة المرور يجب ألا تقل عن 6 أحرف");if(pass!==confirm)return setMsg("تأكيد كلمة المرور غير مطابق");setBusy(true);try{await changeMyPassword(pass);setPass("");setConfirm("");setMsg("تم تغيير كلمة المرور بنجاح")}catch(e){setMsg(friendlyError(e))}finally{setBusy(false)}};return <div><label>كلمة المرور الجديدة<input type="password" minLength="6" value={pass} onChange={e=>setPass(e.target.value)} placeholder="اكتب كلمة المرور الجديدة"/></label><label>تأكيد كلمة المرور<input type="password" minLength="6" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="أعد كتابة كلمة المرور"/></label>{msg&&<div className={msg.includes("نجاح")?"success-mini":"error-box"}>{msg}</div>}<button type="button" className="secondary-btn" disabled={busy} onClick={change}>تغيير كلمة المرور</button></div>}
function AccountSettingsPage({session}){const [name,setName]=useState(session.profile?.name||"");const [storeName,setStoreName]=useState(session.profile?.storeName||"");const [address,setAddress]=useState(session.profile?.address||"");const [whatsapp,setWhatsapp]=useState(session.profile?.whatsapp||session.profile?.phone||"");const [avatarFile,setAvatarFile]=useState(null);const [coverFile,setCoverFile]=useState(null);const [saved,setSaved]=useState(false);const [busy,setBusy]=useState(false);const [err,setErr]=useState("");const save=async()=>{if(!name.trim())return setErr("اكتب الاسم");setBusy(true);setErr("");try{let media={};if(avatarFile||coverFile)media=await uploadUserProfileMedia(session.user.uid,{avatarFile,coverFile});await updateUserProfile(session.user.uid,{name:name.trim(),storeName:storeName.trim(),address:address.trim(),whatsapp:whatsapp.trim(),...media});setSaved(true);setTimeout(()=>setSaved(false),1800)}catch(e){setErr(friendlyError(e))}finally{setBusy(false)}};if(!session.user)return <RequireLogin text="لإدارة إعدادات الحساب، سجّل الدخول أولاً."/>;return <div className="form-card"><h1>صفحة المتجر والبروفايل</h1><p className="muted-text">أنشئ صفحة عامة تظهر للزوار مثل صفحة المتجر، وبداخلها كل إعلاناتك المنشورة.</p>{err&&<div className="error-box">{err}</div>}<label>الاسم<input value={name} onChange={e=>setName(e.target.value)} placeholder="اسم صاحب الحساب"/></label><label>اسم المتجر<input value={storeName} onChange={e=>setStoreName(e.target.value)} placeholder="مثال: البرامون للإلكترونيات"/></label><label>العنوان<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="العنوان أو المنطقة"/></label><div className="info-box"><Phone/> <div><b>رقم الهاتف</b><span>{session.profile?.phone||"-"}</span></div></div><label>رقم واتساب<input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="01xxxxxxxxx" inputMode="tel"/></label><label className="upload">صورة البروفايل<input type="file" accept="image/*" onChange={e=>setAvatarFile(e.target.files?.[0]||null)}/><small>{avatarFile?.name||"اختيار صورة"}</small></label><label className="upload">صورة الهيدر / الغلاف<input type="file" accept="image/*" onChange={e=>setCoverFile(e.target.files?.[0]||null)}/><small>{coverFile?.name||"اختيار صورة غلاف"}</small></label>{saved&&<div className="success-mini">تم حفظ بيانات الصفحة</div>}<button className="primary" disabled={busy} onClick={save}><Save size={18}/> {busy?"جارِ الحفظ...":"حفظ بيانات الصفحة"}</button><div className="password-box"><h3>تغيير كلمة المرور</h3><p className="muted-text">يمكنك تغيير كلمة المرور في أي وقت. وسيظل حسابك مسجلاً على هذا الجهاز حتى تسجل الخروج.</p><ChangePasswordBox/></div></div>}

export default function App(){const session=useSession();if(session.loading)return <div className="loading full">جارِ تشغيل سوق البرامون...</div>;return <Layout session={session}><Routes><Route path="/" element={<HomePage/>}/><Route path="/categories" element={<CategoriesPage/>}/><Route path="/ad/:id" element={<AdDetail/>}/><Route path="/seller/:uid" element={<SellerPage/>}/><Route path="/add" element={<AddPage session={session}/>}/><Route path="/my-ads" element={<MyAdsPage session={session}/>}/><Route path="/favorites" element={<FavoritesPage/>}/><Route path="/account" element={<AccountPage session={session}/>}/><Route path="/account-settings" element={<AccountSettingsPage session={session}/>}/><Route path="/login" element={<AuthPage/>}/><Route path="/register" element={<AuthPage register/>}/><Route path="/subscribe" element={<PaymentPage session={session}/>}/><Route path="/admin" element={<AdminPage session={session}/>}/></Routes></Layout>}

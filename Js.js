// ==========================================
// 1. دوال توافق الجوال (Mobile Responsiveness)
// ==========================================
function toggleMobileMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function closeMobileMenu() {
    if(window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    }
}

// ==========================================
// 2. إعدادات قاعدة البيانات والوضع الليلي
// ==========================================
let db = {
    workorders: JSON.parse(localStorage.getItem("workorders")) || [],
    inventory: JSON.parse(localStorage.getItem("inventory")) || [],
    expenses: JSON.parse(localStorage.getItem("expenses")) || []
};

// استرجاع الوضع الليلي عند تحميل الصفحة
if(localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeBtn').innerText = 'الوضع النهاري ☀️';
    document.getElementById('themeBtn').style.background = '#f39c12';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    let isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    let btn = document.getElementById('themeBtn');
    btn.innerText = isDark ? 'الوضع النهاري ☀️' : 'الوضع الليلي 🌙';
    btn.style.background = isDark ? '#f39c12' : '#2c3e50';
}

function saveDB(){
    localStorage.setItem("workorders", JSON.stringify(db.workorders));
    localStorage.setItem("inventory", JSON.stringify(db.inventory));
    localStorage.setItem("expenses", JSON.stringify(db.expenses));
}

// دالة حماية من ثغرات (XSS)
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

// ==========================================
// 3. قسم لوحة التحكم الرئيسية
// ==========================================
function showDashboard(){
    let revenue = db.workorders.reduce((a, b) => a + (b.price || 0), 0);
    let materials = db.workorders.reduce((a, b) => a + (b.materials || 0), 0);
    let labor = db.workorders.reduce((a, b) => a + (b.labor || 0), 0);
    let totalExpenses = db.expenses.reduce((a, b) => a + (b.amount || 0), 0);
    
    let netProfit = revenue - (materials + labor + totalExpenses);

    document.getElementById("app").innerHTML = `
        <div class="dashboard-grid">
            <div class="stat-card">
                <h3>إجمالي المبيعات</h3>
                <p>${revenue.toFixed(2)} ريال</p>
            </div>
            <div class="stat-card">
                <h3>المصروفات العامة</h3>
                <p style="color: var(--danger);">${totalExpenses.toFixed(2)} ريال</p>
            </div>
            <div class="stat-card" style="border-top: 4px solid ${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">
                <h3>صافي الربح الدقيق</h3>
                <p style="color: ${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'};">${netProfit.toFixed(2)} ريال</p>
            </div>
            <div class="stat-card">
                <h3>عدد السيارات المنجزة</h3>
                <p>${db.workorders.length}</p>
            </div>
        </div>
    `;
}

// ==========================================
// 4. قسم خدماتنا الشامل
// ==========================================
function showServices() {
    document.getElementById("app").innerHTML = `
        <div class="card" style="text-align: center; background: var(--primary); color: white; position: relative;">
            <h2 style="margin: 0; border: none; color: white;">دليل خدمات لمسات كار لزينة السيارات</h2>
            <p style="margin-top: 10px; font-size: 16px;">نقدم مجموعة متكاملة من خدمات التنجيد والزينة بأعلى معايير الجودة</p>
            <button class="btn-print" style="margin-top: 15px; background: white; color: var(--primary); font-weight: bold;" onclick="printServices()">طباعة القائمة 🖨️</button>
        </div>

        <div class="card">
            <h3>أولاً: خدمات التنجيد الداخلية (Upholstery)</h3>
            <ul class="services-list">
                <li>تنجيد المقاعد (جلد طبيعي، جلد صناعي، مخمل، فينيل).</li>
                <li>تغيير ألوان المقاعد أو تصميم نقش خاص.</li>
                <li>تنجيد السقف وإعادة تثبيته.</li>
                <li>تنجيد الأبواب والديكورات الجانبية.</li>
                <li>تجديد الأرضيات أو تركيب موكيت فاخر.</li>
                <li>ترميم الجلد وإصلاح التشققات والبقع.</li>
                <li>تغليف الدركسون والغيارات والفرامل بمواد فاخرة.</li>
            </ul>
        </div>

        <div class="card">
            <h3>ثانياً: خدمات الزينة الداخلية</h3>
            <ul class="services-list">
                <li>تركيب شاشات أمامية وخلفية وكاميرات 360 درجة.</li>
                <li>تركيب إنذارات وريموتات وتشغيل عن بعد.</li>
                <li>تركيب إضاءات LED وأرضيات 5D و7D وعوازل حرارية.</li>
            </ul>
        </div>

        <div class="card">
            <h3>ثالثاً: الزينة الخارجية والصيانة</h3>
            <ul class="services-list">
                <li>تغيير لون السيارة عبر أفلام حماية أو تغليف (Car Wrap).</li>
                <li>تركيب جناحات، دفيوزرات، إضاءات LED وزينون.</li>
                <li>عوازل حماية الطلاء (PPF) وتلميع خارجي.</li>
                <li>إصلاح الخدوش والصدمات ودهان أجزاء السيارة.</li>
            </ul>
        </div>
    `;
}

// ==========================================
// 5. قسم المصروفات اليومية
// ==========================================
function showExpenses() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h3 id="expenseTitle">إضافة مصروف جديد</h3>
            <div class="form-grid">
                <div><label>وصف المصروف</label><input id="expDesc" placeholder="مثال: إيجار، كهرباء، رواتب..." required></div>
                <div><label>المبلغ (ريال)</label><input id="expAmount" type="number" placeholder="المبلغ (ريال)" min="0"></div>
                <div><label>التاريخ</label><input id="expDate" type="date" value="${today}"></div>
            </div>
            <button id="saveExpenseBtn" class="action" onclick="addExpense()">حفظ المصروف</button>
        </div>

        <div class="card">
            <h3>سجل المصروفات <input type="text" id="searchExpense" class="search-bar" placeholder="ابحث في المصروفات..." onkeyup="filterTable('searchExpense', 'expensesTable')"></h3>
            <table>
                <thead><tr><th>التاريخ</th><th>الوصف</th><th>المبلغ</th><th>إجراءات</th></tr></thead>
                <tbody id="expensesTable">
                ${db.expenses.map((e, index) => `
                <tr>
                    <td>${escapeHTML(e.date)}</td>
                    <td>${escapeHTML(e.desc)}</td>
                    <td style="color: var(--danger); font-weight: bold;">${(e.amount || 0).toFixed(2)}</td>
                    <td>
                        <button class="btn-edit" onclick="editExpense(${index})">تعديل</button>
                        <button class="btn-danger" onclick="deleteExpense(${index})">حذف</button>
                    </td>
                </tr>`).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function addExpense() {
    let desc = document.getElementById("expDesc").value.trim();
    let amount = parseFloat(document.getElementById("expAmount").value) || 0;
    let date = document.getElementById("expDate").value;

    if(!desc || amount <= 0) { alert("الرجاء إدخال الوصف والمبلغ بشكل صحيح!"); return; }

    db.expenses.push({ desc, amount, date });
    saveDB(); showExpenses();
}

function editExpense(index) {
    let e = db.expenses[index];
    document.getElementById("expDesc").value = e.desc;
    document.getElementById("expAmount").value = e.amount;
    document.getElementById("expDate").value = e.date;

    document.getElementById("expenseTitle").innerText = "تعديل المصروف";
    let btn = document.getElementById("saveExpenseBtn");
    btn.innerText = "تحديث المصروف"; btn.style.background = "var(--warning)";
    btn.onclick = function() { saveEditedExpense(index); }; window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveEditedExpense(index) {
    let desc = document.getElementById("expDesc").value.trim();
    let amount = parseFloat(document.getElementById("expAmount").value) || 0;
    let date = document.getElementById("expDate").value;

    if(!desc || amount <= 0) { alert("الرجاء إدخال الوصف والمبلغ بشكل صحيح!"); return; }

    db.expenses[index] = { desc, amount, date };
    saveDB(); showExpenses();
}

function deleteExpense(index) {
    if(confirm("هل أنت متأكد من حذف هذا المصروف؟")) { db.expenses.splice(index, 1); saveDB(); showExpenses(); }
}

// ==========================================
// 6. قسم أوامر العمل
// ==========================================
function showWorkOrder(){
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h3 id="formTitle">إنشاء أمر عمل جديد</h3>
            <div class="form-grid">
                <input id="customer" placeholder="اسم العميل" required>
                <input id="car" placeholder="نوع السيارة" required>
                <input id="price" type="number" placeholder="سعر البيع" min="0">
                <input id="materials" type="number" placeholder="تكلفة المواد" min="0">
                <input id="labor" type="number" placeholder="أجور العمال" min="0">
            </div>
            <button id="saveWorkOrderBtn" class="action" onclick="addWorkOrder()">حفظ أمر العمل</button>
        </div>

        <div class="card">
            <h3>سجل أوامر العمل <input type="text" id="searchWorkOrder" class="search-bar" placeholder="ابحث بالعميل أو السيارة..." onkeyup="filterTable('searchWorkOrder', 'workOrdersTable')"></h3>
            <table>
                <thead><tr><th>العميل</th><th>السيارة</th><th>السعر</th><th>الربح</th><th>إجراءات</th></tr></thead>
                <tbody id="workOrdersTable">
                ${db.workorders.map((w, index) => {
                    let profit = (w.price || 0) - ((w.materials || 0) + (w.labor || 0));
                    return `
                    <tr>
                        <td>${escapeHTML(w.customer)}</td>
                        <td>${escapeHTML(w.car)}</td>
                        <td>${(w.price || 0).toFixed(2)}</td>
                        <td style="color: ${profit >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight: bold;">${profit.toFixed(2)}</td>
                        <td>
                            <button class="btn-print" onclick="printInvoice(${index})">طباعة</button>
                            <button class="btn-edit" onclick="editWorkOrder(${index})">تعديل</button>
                            <button class="btn-danger" onclick="deleteWorkOrder(${index})">حذف</button>
                        </td>
                    </tr>`;
                }).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function addWorkOrder(){
    let customerInput = document.getElementById("customer").value.trim();
    let carInput = document.getElementById("car").value.trim();

    if(!customerInput || !carInput) { alert("الرجاء إدخال اسم العميل ونوع السيارة!"); return; }

    db.workorders.push({
        customer: customerInput, car: carInput,
        price: parseFloat(document.getElementById("price").value) || 0,
        materials: parseFloat(document.getElementById("materials").value) || 0,
        labor: parseFloat(document.getElementById("labor").value) || 0
    });
    saveDB(); showWorkOrder();
}

function editWorkOrder(index) {
    let w = db.workorders[index];
    document.getElementById("customer").value = w.customer;
    document.getElementById("car").value = w.car;
    document.getElementById("price").value = w.price || 0;
    document.getElementById("materials").value = w.materials || 0;
    document.getElementById("labor").value = w.labor || 0;

    document.getElementById("formTitle").innerText = "تعديل أمر العمل";
    let btn = document.getElementById("saveWorkOrderBtn");
    btn.innerText = "تحديث أمر العمل"; btn.style.background = "var(--warning)";
    btn.onclick = function() { saveEditedWorkOrder(index); }; window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveEditedWorkOrder(index) {
    let customerInput = document.getElementById("customer").value.trim();
    let carInput = document.getElementById("car").value.trim();

    if(!customerInput || !carInput) { alert("الرجاء إدخال اسم العميل ونوع السيارة!"); return; }

    db.workorders[index] = {
        customer: customerInput, car: carInput,
        price: parseFloat(document.getElementById("price").value) || 0,
        materials: parseFloat(document.getElementById("materials").value) || 0,
        labor: parseFloat(document.getElementById("labor").value) || 0
    };
    saveDB(); showWorkOrder();
}

function deleteWorkOrder(index) {
    if(confirm("هل أنت متأكد من حذف أمر العمل هذا؟")) { db.workorders.splice(index, 1); saveDB(); showWorkOrder(); }
}

// ==========================================
// 7. قسم المخزون
// ==========================================
function showInventory(){
    document.getElementById("app").innerHTML = `
        <div class="card">
            <h3 id="inventoryTitle">إضافة مادة للمخزون</h3>
            <div class="form-grid">
                <input id="item" placeholder="اسم المادة">
                <input id="qty" type="number" placeholder="الكمية" min="1">
            </div>
            <button id="saveItemBtn" class="action" onclick="addItem()">إضافة للمخزون</button>
        </div>
        <div class="card">
            <h3>المواد المتوفرة <input type="text" id="searchInventory" class="search-bar" placeholder="ابحث باسم المادة..." onkeyup="filterTable('searchInventory', 'inventoryTable')"></h3>
            <table>
                <thead><tr><th>المادة</th><th>الكمية</th><th>إجراءات</th></tr></thead>
                <tbody id="inventoryTable">
                ${db.inventory.map((i, index) => `
                <tr>
                    <td>${escapeHTML(i.name)}</td><td>${i.qty}</td>
                    <td>
                        <button class="btn-edit" onclick="editItem(${index})">تعديل</button>
                        <button class="btn-danger" onclick="deleteItem(${index})">حذف</button>
                    </td>
                </tr>`).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function addItem(){
    let itemName = document.getElementById("item").value.trim();
    let itemQty = parseInt(document.getElementById("qty").value) || 0;
    if(!itemName || itemQty <= 0) { alert("الرجاء إدخال اسم المادة وكمية صحيحة!"); return; }
    db.inventory.push({ name: itemName, qty: itemQty });
    saveDB(); showInventory();
}

function editItem(index) {
    let i = db.inventory[index];
    document.getElementById("item").value = i.name; document.getElementById("qty").value = i.qty;
    document.getElementById("inventoryTitle").innerText = "تعديل المادة";
    let btn = document.getElementById("saveItemBtn");
    btn.innerText = "تحديث المادة"; btn.style.background = "var(--warning)";
    btn.onclick = function() { saveEditedItem(index); }; window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveEditedItem(index) {
    let itemName = document.getElementById("item").value.trim();
    let itemQty = parseInt(document.getElementById("qty").value) || 0;
    if(!itemName || itemQty <= 0) { alert("الرجاء إدخال بيانات صحيحة!"); return; }
    db.inventory[index] = { name: itemName, qty: itemQty };
    saveDB(); showInventory();
}

function deleteItem(index) {
    if(confirm("هل أنت متأكد من حذف المادة؟")) { db.inventory.splice(index, 1); saveDB(); showInventory(); }
}

// ==========================================
// 8. دوال البحث والطباعة والتصدير
// ==========================================
function filterTable(inputId, tableId) {
    let input = document.getElementById(inputId).value.toLowerCase();
    let tbody = document.getElementById(tableId);
    let tr = tbody.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let display = false;
        let tds = tr[i].getElementsByTagName("td");
        for(let j = 0; j < tds.length - 1; j++) {
            if (tds[j] && (tds[j].textContent || tds[j].innerText).toLowerCase().indexOf(input) > -1) {
                display = true; break;
            }
        }
        tr[i].style.display = display ? "" : "none";
    }
}

function printServices() {
    let printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html dir="rtl" lang="ar">
        <head>
            <title>قائمة خدمات لمسات كار</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Cairo', sans-serif; padding: 40px; line-height: 1.6; }
                .header { text-align: center; border-bottom: 3px solid #0B5C3E; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { color: #0B5C3E; margin: 0 0 10px 0; }
                h3 { color: #0B5C3E; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                ul { list-style-type: none; padding-right: 0; }
                li { padding-right: 20px; position: relative; margin-bottom: 8px; }
                li::before { content: '▪'; position: absolute; right: 0; color: #0B5C3E; }
            </style>
        </head>
        <body>
            <div class="header"><h1>لمسات كار لزينة السيارات</h1><p>قائمة الخدمات الشاملة</p></div>
            <div style="column-count: 2; column-gap: 40px;">
                <div><h3>التنجيد الداخلي</h3><ul><li>تنجيد مقاعد (جلد، مخمل)</li><li>تنجيد السقف والأبواب</li><li>ترميم الجلد وتغليف الدركسون</li></ul></div>
                <div><h3>الزينة الداخلية</h3><ul><li>شاشات وكاميرات</li><li>إنذارات وإضاءات LED</li><li>عوازل حرارية للزجاج</li></ul></div>
                <div><h3>الزينة الخارجية</h3><ul><li>تغليف (Car Wrap)</li><li>تلميع وحماية طلاء (PPF)</li></ul></div>
                <div><h3>الصيانة والتعديل</h3><ul><li>إصلاح الخدوش والصدمات</li><li>دهان وإعادة طلاء</li></ul></div>
            </div>
            <script>window.onload = function() { setTimeout(function() { window.print(); window.close(); }, 500); }<\/script>
        </body></html>
    `);
    printWindow.document.close();
}

function printInvoice(index) {
    let order = db.workorders[index];
    let price = order.price || 0; let vat = price * 0.15; let total = price + vat;
    let date = new Date().toLocaleDateString('ar-SA');

    let printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html dir="rtl" lang="ar">
        <head>
            <title>فاتورة - ${escapeHTML(order.customer)}</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Cairo', sans-serif; padding: 40px; }
                .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; }
                .header { text-align: center; border-bottom: 2px solid #0B5C3E; padding-bottom: 20px; margin-bottom: 20px; }
                .info-row { display: flex; justify-content: space-between; margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; text-align: center; }
                th, td { border: 1px solid #ddd; padding: 12px; }
                th { background-color: #f4f6f8; color: #0B5C3E; }
                .totals { margin-top: 30px; width: 50%; float: left; }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <div class="header"><h1>لمسات كار لزينة السيارات</h1><p>فاتورة ضريبية مبسطة</p></div>
                <div class="info-row">
                    <div><p><strong>اسم العميل:</strong> ${escapeHTML(order.customer)}</p><p><strong>السيارة:</strong> ${escapeHTML(order.car)}</p></div>
                    <div><p><strong>التاريخ:</strong> ${date}</p><p><strong>رقم الفاتورة:</strong> #${index + 1001}</p></div>
                </div>
                <table><tr><th>البيان</th><th>السعر (ريال)</th></tr><tr><td>أعمال لسيارة (${escapeHTML(order.car)})</td><td>${price.toFixed(2)}</td></tr></table>
                <div class="totals">
                    <table>
                        <tr><th>الإجمالي الفرعي:</th><td>${price.toFixed(2)} ريال</td></tr>
                        <tr><th>ضريبة (15%):</th><td>${vat.toFixed(2)} ريال</td></tr>
                        <tr><th>الإجمالي الشامل:</th><td style="color: #0B5C3E;">${total.toFixed(2)} ريال</td></tr>
                    </table>
                </div>
                <div style="clear:both;"></div>
            </div>
            <script>window.onload = function() { setTimeout(function() { window.print(); window.close(); }, 500); }<\/script>
        </body></html>
    `);
    printWindow.document.close();
}

function exportToExcel() {
    let csvContent = "\uFEFF"; // لدعم العربية
    csvContent += "العميل,السيارة,السعر,تكلفة المواد,أجور العمال,الربح\n";
    db.workorders.forEach(w => {
        let profit = (w.price || 0) - ((w.materials || 0) + (w.labor || 0));
        csvContent += `"${escapeHTML(w.customer)}","${escapeHTML(w.car)}",${w.price || 0},${w.materials || 0},${w.labor || 0},${profit}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "تقرير_مبيعات_لمسات_كار.csv";
    link.click();
}

function exportToPDF() {
    let revenue = db.workorders.reduce((a, b) => a + (b.price || 0), 0);
    let materials = db.workorders.reduce((a, b) => a + (b.materials || 0), 0);
    let labor = db.workorders.reduce((a, b) => a + (b.labor || 0), 0);
    let totalExpenses = db.expenses.reduce((a, b) => a + (b.amount || 0), 0);
    let netProfit = revenue - (materials + labor + totalExpenses);
    let date = new Date().toLocaleDateString('ar-SA');

    let printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html dir="rtl" lang="ar">
        <head>
            <title>التقرير المالي - ${date}</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Cairo', sans-serif; padding: 40px; }
                h1, h2 { color: #0B5C3E; text-align: center; border-bottom: 2px solid #eee; padding-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 40px; text-align: center; }
                th, td { border: 1px solid #ddd; padding: 10px; }
                th { background-color: #f4f6f8; color: #0B5C3E; }
                .summary { width: 70%; margin: auto; }
            </style>
        </head>
        <body>
            <h1>التقرير المالي الشامل - لمسات كار</h1><p style="text-align:center;">التاريخ: ${date}</p>
            <h2>المصروفات العامة</h2>
            <table><tr><th>التاريخ</th><th>الوصف</th><th>المبلغ</th></tr>
            ${db.expenses.map(e => `<tr><td>${escapeHTML(e.date)}</td><td>${escapeHTML(e.desc)}</td><td>${(e.amount||0).toFixed(2)}</td></tr>`).join("")}</table>
            <h2>الملخص المالي وصافي الربح</h2>
            <table class="summary">
                <tr><th>الإيرادات:</th><td style="color: green;">${revenue.toFixed(2)} ريال</td></tr>
                <tr><th>تكلفة المواد:</th><td>${materials.toFixed(2)} ريال</td></tr>
                <tr><th>أجور العمال:</th><td>${labor.toFixed(2)} ريال</td></tr>
                <tr><th>المصروفات:</th><td style="color: red;">${totalExpenses.toFixed(2)} ريال</td></tr>
                <tr><th>صافي الربح الدقيق:</th><td style="color: ${netProfit >= 0 ? 'green' : 'red'};">${netProfit.toFixed(2)} ريال</td></tr>
            </table>
            <script>window.onload = function() { setTimeout(function() { window.print(); window.close(); }, 500); }<\/script>
        </body></html>
    `);
    printWindow.document.close();
}

// ==========================================
// 9. قسم التقارير المالية والضريبية
// ==========================================
function showReports(){
    let revenue = db.workorders.reduce((a, b) => a + (b.price || 0), 0);
    let materials = db.workorders.reduce((a, b) => a + (b.materials || 0), 0);
    let labor = db.workorders.reduce((a, b) => a + (b.labor || 0), 0);
    let totalExpenses = db.expenses.reduce((a, b) => a + (b.amount || 0), 0);
    
    let netProfit = revenue - (materials + labor + totalExpenses);
    let vat = revenue * 0.15;

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h3>التقرير المالي والضريبي
                <div>
                    <button class="btn-excel" onclick="exportToExcel()">تصدير Excel 📊</button>
                    <button class="btn-danger" style="background: #C62828;" onclick="exportToPDF()">حفظ التقرير PDF 📄</button>
                </div>
            </h3>
            <table style="width: 100%; margin: 20px auto; text-align: right;">
                <tr><th style="background: var(--bg); width: 60%;">البيان</th><th style="background: var(--bg);">المبلغ (ريال)</th></tr>
                <tr><td>إجمالي المبيعات (الإيرادات)</td><td style="color: var(--success); font-weight:bold;">${revenue.toFixed(2)}</td></tr>
                <tr><td>إجمالي تكلفة المواد</td><td>${materials.toFixed(2)}</td></tr>
                <tr><td>إجمالي أجور العمال</td><td>${labor.toFixed(2)}</td></tr>
                <tr><td>إجمالي المصروفات العامة</td><td style="color: var(--danger);">${totalExpenses.toFixed(2)}</td></tr>
                <tr style="border-top: 2px solid var(--border-color);">
                    <td style="font-weight: bold;">صافي الربح الحقيقي</td>
                    <td style="font-weight: bold; color: ${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'};">${netProfit.toFixed(2)}</td>
                </tr>
            </table>
            <h3 style="margin-top: 40px; border-top: 1px dashed var(--border-color); padding-top:20px;">التقرير الضريبي المبدئي</h3>
            <table style="width: 100%; margin: 20px auto; text-align: right;">
                <tr><td>إجمالي المبيعات</td><td>${revenue.toFixed(2)}</td></tr>
                <tr><td>ضريبة القيمة المضافة (15%)</td><td style="color: var(--danger);">${vat.toFixed(2)}</td></tr>
                <tr style="font-weight: bold; background: var(--bg);">
                    <td>الإجمالي الشامل للضريبة</td><td>${(revenue + vat).toFixed(2)}</td>
                </tr>
            </table>
        </div>
    `;
}

// التشغيل الافتراضي عند فتح الصفحة
showDashboard();
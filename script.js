// --- BAGIAN 1: jQuery (Sidebar & Navigasi) ---
$(document).ready(function() {
    // Toggle Sidebar
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("body").toggleClass("toggled");
    });

    // Pindah Menu Halaman
    $(".menu-item").click(function(e) {
        e.preventDefault();
        
        // Ubah Active Class pada Menu
        $(".menu-item").removeClass("active");
        $(this).addClass("active");

        // Ambil ID View yang dituju
        let targetView = $(this).data("target");
        let menuText = $(this).text().trim();

        // Ganti Tampilan
        $(".view-section").addClass("d-none");
        $(targetView).removeClass("d-none");
        
        // Ganti Judul Halaman
        $("#page-title").text(menuText);
    });
});

// --- BAGIAN 2: DATA & LOGIKA CRUD ---

// Data Mahasiswa (Dummy)
let students = [
    { nim: "2411501045", nama: "Andri", jurusan: "Teknologi Informasi", ipk: 3.85 }
];

// Data Mata Kuliah (Sesuai Permintaan)
let courses = [
    { 
        kode: "TI-FS01", 
        nama: "Pemrograman Fullstack", 
        sks: 4, 
        dosen: "Sadr Lufti Mufreni, S.Kom., M.Sc." 
    },
    { 
        kode: "TI-JK02", 
        nama: "Jaringan Komputer", 
        sks: 3, 
        dosen: "Danur Wijayanto, S.Kom., M.Cs." 
    },
    { 
        kode: "TI-RS03", 
        nama: "Teknologi Informasi Rumah Sakit", 
        sks: 2, 
        dosen: "Tikaridha Hardiani, S.Kom." 
    },
    { 
        kode: "TI-FD04", 
        nama: "Forensik Digital", 
        sks: 3, 
        dosen: "Arizona Firdonsyah, S.Kom., M.Kom." 
    },
    { 
        kode: "TI-RPL05", 
        nama: "Rekayasa Perangkat Lunak", 
        sks: 3, 
        dosen: "Arizona Firdonsyah, S.Kom., M.Kom." 
    }
];

// --- FUNGSI UPDATE DASHBOARD ---
function updateDashboardStats() {
    const countMhs = document.getElementById('count-mahasiswa');
    if (countMhs) countMhs.innerText = students.length;

    const countMk = document.getElementById('count-matkul');
    if (countMk) countMk.innerText = courses.length;
}

// ==========================================
// 1. LOGIKA CRUD MAHASISWA
// ==========================================
const studentTableBody = document.querySelector('#studentTableBody');
const studentForm = document.getElementById('studentForm');

// Render Tabel Mahasiswa
function renderStudents() {
    studentTableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        // Manipulasi Style: Hijau jika IPK > 3.5
        let ipkStyle = student.ipk > 3.5 ? "color: green; font-weight: bold;" : "";
        
        row.innerHTML = `
            <td>${student.nim}</td>
            <td>${student.nama}</td>
            <td>${student.jurusan}</td>
            <td style="${ipkStyle}">${student.ipk}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
    updateDashboardStats();
}

// Buka Modal Tambah MHS
window.openStudentModal = function() {
    studentForm.reset();
    document.getElementById('studentId').value = "";
    document.getElementById('studentModalTitle').innerText = "Tambah Mahasiswa";
    new bootstrap.Modal(document.getElementById('studentModal')).show();
}

// Buka Modal Edit MHS
window.editStudent = function(index) {
    const s = students[index];
    document.getElementById('studentId').value = index;
    document.getElementById('nim').value = s.nim;
    document.getElementById('nama').value = s.nama;
    document.getElementById('jurusan').value = s.jurusan;
    document.getElementById('ipk').value = s.ipk;
    document.getElementById('studentModalTitle').innerText = "Edit Mahasiswa";
    new bootstrap.Modal(document.getElementById('studentModal')).show();
}

// Simpan Data MHS
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const data = {
        nim: document.getElementById('nim').value,
        nama: document.getElementById('nama').value,
        jurusan: document.getElementById('jurusan').value,
        ipk: document.getElementById('ipk').value
    };

    if (id === "") students.push(data);
    else students[id] = data;

    bootstrap.Modal.getInstance(document.getElementById('studentModal')).hide();
    renderStudents();
});

// Hapus Data MHS
window.deleteStudent = function(index) {
    if(confirm("Hapus data mahasiswa ini?")) {
        students.splice(index, 1);
        renderStudents();
    }
}

// ==========================================
// 2. LOGIKA CRUD MATA KULIAH
// ==========================================
const courseTableBody = document.querySelector('#courseTableBody');
const courseForm = document.getElementById('courseForm');

// Render Tabel Mata Kuliah
function renderCourses() {
    courseTableBody.innerHTML = "";
    courses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="badge bg-primary">${course.kode}</span></td>
            <td class="fw-bold">${course.nama}</td>
            <td>${course.sks} SKS</td>
            <td>${course.dosen}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCourse(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteCourse(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });
    updateDashboardStats();
}

// Buka Modal Tambah MK
window.openCourseModal = function() {
    courseForm.reset();
    document.getElementById('courseId').value = "";
    document.getElementById('courseModalTitle').innerText = "Tambah Mata Kuliah";
    new bootstrap.Modal(document.getElementById('courseModal')).show();
}

// Buka Modal Edit MK
window.editCourse = function(index) {
    const c = courses[index];
    document.getElementById('courseId').value = index;
    document.getElementById('kodeMk').value = c.kode;
    document.getElementById('namaMk').value = c.nama;
    document.getElementById('sks').value = c.sks;
    document.getElementById('dosen').value = c.dosen;
    document.getElementById('courseModalTitle').innerText = "Edit Mata Kuliah";
    new bootstrap.Modal(document.getElementById('courseModal')).show();
}

// Simpan Data MK
courseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('courseId').value;
    const data = {
        kode: document.getElementById('kodeMk').value,
        nama: document.getElementById('namaMk').value,
        sks: document.getElementById('sks').value,
        dosen: document.getElementById('dosen').value
    };

    if (id === "") courses.push(data);
    else courses[id] = data;

    bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
    renderCourses();
});

// Hapus Data MK
window.deleteCourse = function(index) {
    if(confirm("Hapus mata kuliah ini?")) {
        courses.splice(index, 1);
        renderCourses();
    }
}

// --- INITIAL RENDER (Saat Web Dibuka) ---
document.addEventListener("DOMContentLoaded", function() {
    renderStudents();
    renderCourses();
});
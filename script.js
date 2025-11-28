// --- jQuery (Sidebar & Navigasi) ---
$(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("body").toggleClass("toggled");
    });

    $(".menu-item").click(function(e) {
        e.preventDefault();
        $(".menu-item").removeClass("active");
        $(this).addClass("active");

        let targetView = $(this).data("target");
        let menuText = $(this).text().trim();

        $(".view-section").addClass("d-none");
        $(targetView).removeClass("d-none");
        $("#page-title").text(menuText);
    });
});

// ==========================================
//              DATABASE (ARRAY)
// ==========================================

// 1. Data Mahasiswa
let students = [
    { nim: "2411501045", nama: "Andri", jurusan: "Teknologi Informasi", ipk: 3.85 }
];

// 2. Data Dosen (BARU)
let lecturers = [
    { nidn: "0412098801", nama: "Sadr Lufti Mufreni, S.Kom., M.Sc.", keahlian: "Fullstack Dev", nohp: "08123456789" },
    { nidn: "0425039002", nama: "Danur Wijayanto, S.Kom., M.Cs.", keahlian: "Jaringan Komputer", nohp: "08987654321" },
    { nidn: "0411059203", nama: "Arizona Firdonsyah, S.Kom., M.Kom.", keahlian: "Cyber Security", nohp: "08567891234" }
];

// 3. Data Mata Kuliah
let courses = [
    { kode: "TI-FS01", nama: "Pemrograman Fullstack", sks: 4, dosen: "Sadr Lufti Mufreni" },
    { kode: "TI-JK02", nama: "Jaringan Komputer", sks: 3, dosen: "Danur Wijayanto" },
    { kode: "TI-RS03", nama: "TI Rumah Sakit", sks: 2, dosen: "Tikaridha Hardiani" }
];

// --- UPDATE DASHBOARD ---
function updateDashboardStats() {
    // Hitung Mahasiswa
    const countMhs = document.getElementById('count-mahasiswa');
    if (countMhs) countMhs.innerText = students.length;

    // Hitung Dosen (BARU)
    const countDsn = document.getElementById('count-dosen');
    if (countDsn) countDsn.innerText = lecturers.length;

    // Hitung Matkul
    const countMk = document.getElementById('count-matkul');
    if (countMk) countMk.innerText = courses.length;
}

// ==========================================
//            1. CRUD MAHASISWA
// ==========================================
const studentTableBody = document.querySelector('#studentTableBody');
const studentForm = document.getElementById('studentForm');

function renderStudents() {
    studentTableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        let ipkStyle = student.ipk >= 3.0 ? "color: green; font-weight: bold;" : "color: red;";
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

window.openStudentModal = function() {
    studentForm.reset();
    document.getElementById('studentId').value = "";
    document.getElementById('studentModalTitle').innerText = "Tambah Mahasiswa";
    bootstrap.Modal.getOrCreateInstance(document.getElementById('studentModal')).show();
}

window.editStudent = function(index) {
    const s = students[index];
    document.getElementById('studentId').value = index;
    document.getElementById('nim').value = s.nim;
    document.getElementById('nama').value = s.nama;
    document.getElementById('jurusan').value = s.jurusan;
    document.getElementById('ipk').value = s.ipk;
    document.getElementById('studentModalTitle').innerText = "Edit Mahasiswa";
    bootstrap.Modal.getOrCreateInstance(document.getElementById('studentModal')).show();
}

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const ipkInput = parseFloat(document.getElementById('ipk').value);

    if(ipkInput < 0 || ipkInput > 4.00) {
        alert("IPK tidak valid!"); return;
    }

    const data = {
        nim: document.getElementById('nim').value,
        nama: document.getElementById('nama').value,
        jurusan: document.getElementById('jurusan').value,
        ipk: ipkInput
    };

    if (id === "") students.push(data);
    else students[id] = data;

    bootstrap.Modal.getOrCreateInstance(document.getElementById('studentModal')).hide();
    renderStudents();
    alert("Data Mahasiswa Tersimpan!");
});

window.deleteStudent = function(index) {
    if(confirm("Hapus mahasiswa ini?")) {
        students.splice(index, 1);
        renderStudents();
    }
}

// ==========================================
//            2. CRUD DOSEN (BARU)
// ==========================================
const lecturerTableBody = document.querySelector('#lecturerTableBody');
const lecturerForm = document.getElementById('lecturerForm');

function renderLecturers() {
    lecturerTableBody.innerHTML = "";
    lecturers.forEach((lecturer, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lecturer.nidn}</td>
            <td class="fw-bold">${lecturer.nama}</td>
            <td>${lecturer.keahlian}</td>
            <td>${lecturer.nohp}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editLecturer(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteLecturer(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        lecturerTableBody.appendChild(row);
    });
    updateDashboardStats();
}

window.openLecturerModal = function() {
    lecturerForm.reset();
    document.getElementById('lecturerId').value = "";
    document.getElementById('lecturerModalTitle').innerText = "Tambah Dosen";
    bootstrap.Modal.getOrCreateInstance(document.getElementById('lecturerModal')).show();
}

window.editLecturer = function(index) {
    const l = lecturers[index];
    document.getElementById('lecturerId').value = index;
    document.getElementById('nidn').value = l.nidn;
    document.getElementById('namaDosen').value = l.nama;
    document.getElementById('keahlian').value = l.keahlian;
    document.getElementById('nohp').value = l.nohp;
    document.getElementById('lecturerModalTitle').innerText = "Edit Dosen";
    bootstrap.Modal.getOrCreateInstance(document.getElementById('lecturerModal')).show();
}

lecturerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('lecturerId').value;
    const data = {
        nidn: document.getElementById('nidn').value,
        nama: document.getElementById('namaDosen').value,
        keahlian: document.getElementById('keahlian').value,
        nohp: document.getElementById('nohp').value
    };

    if (id === "") lecturers.push(data);
    else lecturers[id] = data;

    bootstrap.Modal.getOrCreateInstance(document.getElementById('lecturerModal')).hide();
    renderLecturers();
    alert("Data Dosen Tersimpan!");
});

window.deleteLecturer = function(index) {
    if(confirm("Hapus data dosen ini?")) {
        lecturers.splice(index, 1);
        renderLecturers();
    }
}

// ==========================================
//            3. CRUD MATA KULIAH
// ==========================================
const courseTableBody = document.querySelector('#courseTableBody');
const courseForm = document.getElementById('courseForm');

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

window.openCourseModal = function() {
    courseForm.reset();
    document.getElementById('courseId').value = "";
    document.getElementById('courseModalTitle').innerText = "Tambah Mata Kuliah";
    bootstrap.Modal.getOrCreateInstance(document.getElementById('courseModal')).show();
}

window.editCourse = function(index) {
    const c = courses[index];
    document.getElementById('courseId').value = index;
    document.getElementById('kodeMk').value = c.kode;
    document.getElementById('namaMk').value = c.nama;
    document.getElementById('sks').value = c.sks;
    document.getElementById('dosenPengampu').value = c.dosen;
    document.getElementById('courseModalTitle').innerText = "Edit Mata Kuliah";
    bootstrap.Modal.getOrCreateInstance(document.getElementById('courseModal')).show();
}

courseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('courseId').value;
    const sksInput = parseInt(document.getElementById('sks').value);

    if(sksInput < 1 || sksInput > 6) {
        alert("SKS tidak valid (1-6)!"); return;
    }

    const data = {
        kode: document.getElementById('kodeMk').value,
        nama: document.getElementById('namaMk').value,
        sks: sksInput,
        dosen: document.getElementById('dosenPengampu').value
    };

    if (id === "") courses.push(data);
    else courses[id] = data;

    bootstrap.Modal.getOrCreateInstance(document.getElementById('courseModal')).hide();
    renderCourses();
    alert("Mata Kuliah Tersimpan!");
});

window.deleteCourse = function(index) {
    if(confirm("Hapus mata kuliah ini?")) {
        courses.splice(index, 1);
        renderCourses();
    }
}

// --- INITIAL RENDER ---
document.addEventListener("DOMContentLoaded", function() {
    renderStudents();
    renderLecturers();
    renderCourses();
});
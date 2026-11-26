// =============================================
// STORE - Simulation du backend (localStorage)
// =============================================

const STORE_KEY = 'cartes_etudiantes_db';

const defaultDB = {
  universities: [
    { id: 1, code: 'UNILU', nom: 'Université de Lubumbashi', active: true },
    { id: 2, code: 'UNIKIN', nom: 'Université de Kinshasa', active: true },
  ],
  faculties: [
    { id: 1, university_id: 1, code: 'FACS', nom: 'Faculté des Sciences' },
    { id: 2, university_id: 1, code: 'FASP', nom: 'Faculté de Médecine' },
    { id: 3, university_id: 1, code: 'DROIT', nom: 'Faculté de Droit' },
    { id: 4, university_id: 2, code: 'POLY', nom: 'Faculté Polytechnique' },
    { id: 5, university_id: 2, code: 'LETTR', nom: 'Faculté des Lettres' },
  ],
    users: [
    { id: 1, nom: 'Admin National', email: 'ministere@rdc.gov', password: 'ministre123', role: 'MINISTERE', university_id: null, faculty_id: null, active: true },
    
    /* Admins Universités */
    { id: 2, nom: 'Recteur UNILU', email: 'admin@unilu.ac.cd', password: 'unilu123', role: 'UNIVERSITE', university_id: 1, faculty_id: null, active: true },
    { id: 4, nom: 'Recteur UNIKIN', email: 'admin@unikin.ac.cd', password: 'unikin123', role: 'UNIVERSITE', university_id: 2, faculty_id: null, active: true },
    
    /* Admins Facultés UNILU */
    { id: 3, nom: 'Doyen Sciences', email: 'doyen@facs.unilu.ac.cd', password: 'facs123', role: 'FACULTE', university_id: 1, faculty_id: 1, active: true },
    { id: 5, nom: 'Doyen Médecine', email: 'doyen@medecine.unilu.ac.cd', password: 'med123', role: 'FACULTE', university_id: 1, faculty_id: 2, active: true },
    { id: 6, nom: 'Doyen Droit', email: 'doyen@droit.unilu.ac.cd', password: 'droit123', role: 'FACULTE', university_id: 1, faculty_id: 3, active: true },
    
    /* Admins Facultés UNIKIN */
    { id: 7, nom: 'Doyen Polytechnique', email: 'doyen@poly.unikin.ac.cd', password: 'poly123', role: 'FACULTE', university_id: 2, faculty_id: 4, active: true },
    { id: 8, nom: 'Doyen Lettres', email: 'doyen@lettres.unikin.ac.cd', password: 'lettres123', role: 'FACULTE', university_id: 2, faculty_id: 5, active: true },
  ],
  students: [
    {
      id: 1,
      national_id: 'CD-UNILU-A7F92K',
      university_student_id: 'UNILU-2024-001',
      nom: 'Kabongo',
      postnom: 'Mutombo',
      prenom: 'Jean-Pierre',
      university_id: 1,
      faculty_id: 1,
      promotion: 'L2',
      academic_year: '2024-2025',
      photo_path: null,
      status: 'EN_ATTENTE',
      submitted_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 2,
      national_id: 'CD-UNILU-B3X18Y',
      university_student_id: 'UNILU-2024-002',
      nom: 'Nkosi',
      postnom: 'wa Mbeki',
      prenom: 'Amara',
      university_id: 1,
      faculty_id: 1,
      promotion: 'L1',
      academic_year: '2024-2025',
      photo_path: null,
      status: 'FACULTE_VALIDÉ',
      submitted_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 3,
      national_id: 'CD-UNILU-C9M44Z',
      university_student_id: 'UNILU-2024-003',
      nom: 'Ilunga',
      postnom: 'Kalala',
      prenom: 'Cécile',
      university_id: 1,
      faculty_id: 2,
      promotion: 'G3',
      academic_year: '2024-2025',
      photo_path: null,
      status: 'CARTE_GÉNÉRÉE',
      submitted_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
  ],
  cards: [
    {
      id: 1,
      student_id: 3,
      card_path: null,
      qr_code: 'CD-UNILU-C9M44Z-2024',
      generated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      active: true,
    }
  ],
  logs: [
    { id: 1, user_id: 2, action: 'CARTE_GENEREE', target: 'Étudiant CD-UNILU-C9M44Z', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    { id: 2, user_id: 3, action: 'DOSSIER_VALIDÉ', target: 'Étudiant UNILU-2024-002', created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
    { id: 3, user_id: 1, action: 'UNIVERSITÉ_CRÉÉE', target: 'UNILU', created_at: new Date(Date.now() - 86400000 * 30).toISOString() },
    { id: 4, user_id: 3, action: 'DOSSIER_REÇU', target: 'Étudiant UNILU-2024-001', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 5, user_id: 2, action: 'FACULTÉ_CRÉÉE', target: 'Faculté des Sciences', created_at: new Date(Date.now() - 86400000 * 25).toISOString() },
  ],
  nextIds: { student: 4, user: 9, university: 3, faculty: 6, card: 2, log: 6 }
};

const DB_VERSION = 2;

function getDB() {
  const raw = localStorage.getItem(STORE_KEY);
  const version = localStorage.getItem(STORE_KEY + '_version');
  
  if (!raw || version != DB_VERSION) {
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultDB));
    localStorage.setItem(STORE_KEY + '_version', DB_VERSION);
    return JSON.parse(JSON.stringify(defaultDB));
  }
  return JSON.parse(raw);
}

function saveDB(db) {
  localStorage.setItem(STORE_KEY, JSON.stringify(db));
}

function resetDB() {
  localStorage.setItem(STORE_KEY, JSON.stringify(defaultDB));
  localStorage.setItem(STORE_KEY + '_version', DB_VERSION);
}

// ---- UNIVERSITIES ----
function getUniversities() { return getDB().universities; }

function createUniversity(data) {
  const db = getDB();
  const univ = { id: db.nextIds.university++, ...data, active: true };
  db.universities.push(univ);
  saveDB(db);
  return univ;
}

// ---- FACULTIES ----
function getFaculties(university_id = null) {
  const db = getDB();
  return university_id
    ? db.faculties.filter(f => f.university_id === university_id)
    : db.faculties;
}

function createFaculty(data) {
  const db = getDB();
  const faculty = { id: db.nextIds.faculty++, ...data };
  db.faculties.push(faculty);
  saveDB(db);
  return faculty;
}

// ---- USERS ----
function getUsers(role = null, university_id = null) {
  const db = getDB();
  let users = db.users;
  if (role) users = users.filter(u => u.role === role);
  if (university_id) users = users.filter(u => u.university_id === university_id);
  return users;
}

function createUser(data) {
  const db = getDB();
  const user = { id: db.nextIds.user++, ...data, active: true };
  db.users.push(user);
  saveDB(db);
  return user;
}

function authenticateByUniversity(univId, password) {
  const db = getDB();
  const user = db.users.find(u => u.role === 'UNIVERSITE' && u.university_id === parseInt(univId) && u.password === password && u.active);
  if(user) { 
    db.logs.push({ id: db.nextIds.log++, user_id: user.id, action: 'CONNEXION', target: `Admin Université ID ${univId}`, created_at: new Date().toISOString() });
    saveDB(db);
    return user; 
  }
  return null;
}

function authenticateByFaculty(facId, password) {
  const db = getDB();
  const user = db.users.find(u => u.role === 'FACULTE' && u.faculty_id === parseInt(facId) && u.password === password && u.active);
  if(user) { 
    db.logs.push({ id: db.nextIds.log++, user_id: user.id, action: 'CONNEXION', target: `Admin Faculté ID ${facId}`, created_at: new Date().toISOString() });
    saveDB(db);
    return user; 
  }
  return null;
}

function authenticateMinistere(password) {
  const db = getDB();
  const user = db.users.find(u => u.role === 'MINISTERE' && u.password === password && u.active);
  if(user) { 
    db.logs.push({ id: db.nextIds.log++, user_id: user.id, action: 'CONNEXION', target: `Ministère`, created_at: new Date().toISOString() });
    saveDB(db);
    return user; 
  }
  return null;
}

function authenticateUser(email, password) {
  const db = getDB();
  return db.users.find(u => u.email === email && u.password === password && u.active) || null;
}

// ---- STUDENTS ----
function getStudents(filters = {}) {
  const db = getDB();
  let students = db.students;
  if (filters.university_id) students = students.filter(s => s.university_id === filters.university_id);
  if (filters.faculty_id) students = students.filter(s => s.faculty_id === filters.faculty_id);
  if (filters.status) students = students.filter(s => s.status === filters.status);
  return students;
}

function createStudent(data) {
  const db = getDB();
  const natId = generateNationalId(data.university_id, db);
  const student = {
    id: db.nextIds.student++,
    national_id: natId,
    status: 'EN_ATTENTE',
    submitted_at: new Date().toISOString(),
    ...data
  };
  db.students.push(student);
  saveDB(db);
  return student;
}

function updateStudentStatus(studentId, status, userId) {
  const db = getDB();
  const idx = db.students.findIndex(s => s.id === studentId);
  if (idx === -1) return null;
  db.students[idx].status = status;
  // Add log
  db.logs.push({
    id: db.nextIds.log++,
    user_id: userId,
    action: status === 'FACULTE_VALIDÉ' ? 'DOSSIER_VALIDÉ_FACULTÉ' : status === 'UNIVERSITÉ_VALIDÉ' ? 'DOSSIER_VALIDÉ_UNIVERSITÉ' : status,
    target: `Étudiant ${db.students[idx].national_id}`,
    created_at: new Date().toISOString()
  });
  saveDB(db);
  return db.students[idx];
}

function generateCard(studentId, userId) {
  const db = getDB();
  const student = db.students.find(s => s.id === studentId);
  if (!student) return null;

  // Check if card already exists
  let card = db.cards.find(c => c.student_id === studentId);
  if (!card) {
    card = {
      id: db.nextIds.card++,
      student_id: studentId,
      card_path: null,
      qr_code: `${student.national_id}-${student.academic_year}`,
      generated_at: new Date().toISOString(),
      active: true
    };
    db.cards.push(card);
  }

  // Update student status
  const idx = db.students.findIndex(s => s.id === studentId);
  db.students[idx].status = 'CARTE_GÉNÉRÉE';

  // Log
  db.logs.push({
    id: db.nextIds.log++,
    user_id: userId,
    action: 'CARTE_GÉNÉRÉE',
    target: `Étudiant ${student.national_id}`,
    created_at: new Date().toISOString()
  });

  saveDB(db);
  return { student: db.students[idx], card };
}

function getCardForStudent(studentId) {
  const db = getDB();
  return db.cards.find(c => c.student_id === studentId) || null;
}

// ---- LOGS ----
function getLogs(limit = 50) {
  const db = getDB();
  return db.logs
    .slice(-limit)
    .reverse()
    .map(log => {
      const user = db.users.find(u => u.id === log.user_id);
      return { ...log, user_nom: user ? user.nom : 'Système' };
    });
}

// ---- UTILS ----
function generateNationalId(universityId, db) {
  const univ = db.universities.find(u => u.id === universityId);
  const code = univ ? univ.code : 'UNK';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `CD-${code}-${suffix}`;
}

function getStats() {
  const db = getDB();
  const students = db.students;
  return {
    total_students: students.length,
    en_attente: students.filter(s => s.status === 'EN_ATTENTE').length,
    faculte_valide: students.filter(s => s.status === 'FACULTE_VALIDÉ').length,
    universite_valide: students.filter(s => s.status === 'UNIVERSITÉ_VALIDÉ').length,
    cartes_generees: students.filter(s => s.status === 'CARTE_GÉNÉRÉE').length,
    total_universities: db.universities.length,
    total_faculties: db.faculties.length,
    total_admins: db.users.filter(u => u.role !== 'MINISTERE').length,
  };
}

// Auth session
function saveSession(user) {
  sessionStorage.setItem('current_user', JSON.stringify(user));
}

function getSession() {
  const raw = sessionStorage.getItem('current_user');
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  sessionStorage.removeItem('current_user');
}

function requireAuth(allowedRoles = []) {
  const user = getSession();
  if (!user) { window.location.href = '../index.html'; return null; }
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    window.location.href = '../index.html';
    return null;
  }
  return user;
}

window.Store = {
  getDB, saveDB, resetDB,
  getUniversities, createUniversity,
  getFaculties, createFaculty,
  getUsers, createUser, authenticateUser, authenticateByUniversity, authenticateByFaculty, authenticateMinistere,
  getStudents, createStudent, updateStudentStatus, generateCard, getCardForStudent,
  getLogs, getStats,
  saveSession, getSession, clearSession, requireAuth,
};

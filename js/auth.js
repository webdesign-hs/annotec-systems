// Authentication System for Annotec Systems
// Prüft ob Benutzer eingeloggt ist und leitet zur Login-Seite weiter wenn nötig

(function() {
    'use strict';
    
    // Konfiguration
    const AUTH_KEY = 'annotec_auth';
    const LOGIN_PAGE = 'login.html';
    const CORRECT_PASSWORD = 'spanndecke123';
    
    // Prüft ob aktuell auf Login-Seite
    function isLoginPage() {
        return window.location.pathname.endsWith(LOGIN_PAGE) || 
               window.location.pathname.endsWith('/' + LOGIN_PAGE);
    }
    
    // Prüft ob Benutzer authentifiziert ist
    function isAuthenticated() {
        return sessionStorage.getItem(AUTH_KEY) === 'true';
    }
    
    // Setzt Authentication Status
    function setAuthenticated(status) {
        if (status) {
            sessionStorage.setItem(AUTH_KEY, 'true');
        } else {
            sessionStorage.removeItem(AUTH_KEY);
        }
    }
    
    // Leitet zur Login-Seite weiter
    function redirectToLogin() {
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        
        // Verhindere Endlosschleife wenn bereits auf Login-Seite
        if (!isLoginPage()) {
            window.location.href = basePath + LOGIN_PAGE;
        }
    }
    
    // Leitet zur Hauptseite weiter (nach erfolgreichem Login)
    function redirectToHome() {
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        window.location.href = basePath + 'index.html';
    }
    
    // Hauptlogik für Authentifizierung
    function initAuth() {
        if (isLoginPage()) {
            // Auf Login-Seite: Setup Login-Formular
            setupLoginForm();
        } else {
            // Auf anderer Seite: Prüfe Authentication
            if (!isAuthenticated()) {
                redirectToLogin();
            }
        }
    }
    
    // Setup für Login-Formular
    function setupLoginForm() {
        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const passwordInput = document.getElementById('password');
            const passwordToggle = document.getElementById('passwordToggle');
            const errorMessage = document.getElementById('errorMessage');
            
            // Password Toggle Funktionalität
            if (passwordToggle && passwordInput) {
                passwordToggle.addEventListener('click', function() {
                    const eyeIcon = document.getElementById('eyeIcon');
                    const eyeOffIcon = document.getElementById('eyeOffIcon');
                    
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        eyeIcon.style.display = 'none';
                        eyeOffIcon.style.display = 'block';
                    } else {
                        passwordInput.type = 'password';
                        eyeIcon.style.display = 'block';
                        eyeOffIcon.style.display = 'none';
                    }
                });
            }
            
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const password = passwordInput.value;
                    
                    if (password === CORRECT_PASSWORD) {
                        // Erfolgreiches Login
                        setAuthenticated(true);
                        redirectToHome();
                    } else {
                        // Fehlerhaftes Passwort
                        if (errorMessage) {
                            errorMessage.style.display = 'block';
                        }
                        passwordInput.value = '';
                        passwordInput.focus();
                        
                        // Fehler nach 3 Sekunden ausblenden
                        setTimeout(() => {
                            if (errorMessage) {
                                errorMessage.style.display = 'none';
                            }
                        }, 3000);
                    }
                });
            }
        });
    }
    
    // Logout-Funktion (falls später benötigt)
    function logout() {
        setAuthenticated(false);
        redirectToLogin();
    }
    
    // Öffentliche API
    window.AnnotecAuth = {
        logout: logout,
        isAuthenticated: isAuthenticated
    };
    
    // Starte Authentication beim Laden der Seite
    initAuth();
    
})();
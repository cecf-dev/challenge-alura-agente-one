@echo off
echo ==========================================
echo   MangaTech AI - Inicio Rapido
echo ==========================================
echo.

:: Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js no encontrado. Instala desde https://nodejs.org
    exit /b 1
)

:: Verificar Python
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Python no encontrado. Instala desde https://python.org
    exit /b 1
)

:: Copiar .env si no existe
if not exist ".env" (
    copy .env.example .env
    echo [OK] Archivo .env creado desde .env.example
    echo [!] Edita .env con tu OPENAI_API_KEY antes de continuar
    pause
    exit /b 0
)

echo [1/3] Instalando dependencias del servidor...
cd server && call npm install && cd ..

echo [2/3] Instalando dependencias de Python...
cd ai-service && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt && cd ..

echo [3/3] Instalando dependencias del cliente...
cd client && call npm install && cd ..

echo.
echo ==========================================
echo   Instalacion completa!
echo ==========================================
echo.
echo Para iniciar los servicios:
echo   Terminal 1: cd server ^& npm run dev
echo   Terminal 2: cd ai-service ^& .venv\Scripts\python main.py
echo   Terminal 3: cd client ^& npm run dev
echo.
echo O abre 3 terminales y ejecuta cada comando.
echo ==========================================
pause

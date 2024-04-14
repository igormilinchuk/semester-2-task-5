import pg from 'pg';

const client = new pg.Client({
    host: 'surus.db.elephantsql.com',
    port: 5432,
    database: 'ddistqnh',
    user: 'ddistqnh',
    password: 'Dr6XKrrqzwxkvLbi9StkUn54Aez_9MB_',
});

async function runDatabaseChecks() {
    try {
        await client.connect();

        await checkDaysOfWeekTable();
        await checkLessonHoursTable();
        await checkSubjectsTable();

        await client.end();
    } catch (error) {
        console.error("Помилка при виконанні перевірок:", error);
    }
}

async function checkDaysOfWeekTable() {
    try {
        const result = await client.query('SELECT * FROM days_of_week');
        console.log("Таблиця days_of_week:");
        console.table(result.rows);
    } catch (error) {
        console.error("Помилка при перевірці таблиці days_of_week:", error);
    }
}

async function checkLessonHoursTable() {
    try {
        const result = await client.query('SELECT * FROM lesson_hours');
        console.log("Таблиця lesson_hours:");
        console.table(result.rows);
    } catch (error) {
        console.error("Помилка при перевірці таблиці lesson_hours:", error);
    }
}

async function checkSubjectsTable() {
    try {
        const result = await client.query('SELECT * FROM subjects');
        console.log("Таблиця subjects:");
        console.table(result.rows);
    } catch (error) {
        console.error("Помилка при перевірці таблиці subjects:", error);
    }
}

runDatabaseChecks();

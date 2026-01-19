import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'expenses.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Initialize expenses file if it doesn't exist
function initExpensesFile() {
  ensureDataDir();
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
  }
}

// Read expenses from file
export function getExpenses() {
  initExpensesFile();
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading expenses:', error);
    return [];
  }
}

// Write expenses to file
export function saveExpenses(expenses) {
  ensureDataDir();
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(expenses, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving expenses:', error);
    return false;
  }
}

// Calculate total expenses
export function getTotalExpenses() {
  const expenses = getExpenses();
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

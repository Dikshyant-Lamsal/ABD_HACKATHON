import fs from 'fs';
import pdf from 'pdf-parse';

export const extractTextFromPDF = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text;
  } catch (err) {
    console.error('PDF parse error:', err.message);
    return '';
  }
};

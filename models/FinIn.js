const pool = require("../config/db"); // Correct PostgreSQL pool import

// const saveFinancialInquiry = async ({
//   userId,
//   chatTitle,
//   chatId,
//   userMessage,
//   aiResponse,
// }) => {
//   const result = await pool.query(
//     `INSERT INTO financial_inquiries
//      (user_id, chat_title, chat_id, user_message, ai_response)
//      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//     [userId, chatTitle, chatId, userMessage, aiResponse]
//   );
//   return result.rows[0];
// };
const saveFinancialInquiry = async ({
  userId,
  chatTitle,
  chatId,
  userMessage,
  aiResponse,
  fileUrl,
}) => {
  const result = await pool.query(
    `INSERT INTO financial_inquiries 
    (user_id, chat_title, chat_id, user_message, ai_response, file_url) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [userId, chatTitle, chatId, userMessage, aiResponse, fileUrl]
  );
  return result.rows[0];
};

const getInquiriesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM financial_inquiries 
     WHERE user_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getInquiriesFromLast7Days = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM financial_inquiries 
     WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '7 days'
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getChatSessionsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT DISTINCT chat_id, chat_title, MIN(created_at) as started_at 
     FROM financial_inquiries 
     WHERE user_id = $1 
     GROUP BY chat_id, chat_title 
     ORDER BY started_at DESC`,
    [userId]
  );
  return result.rows;
};

const getMessagesByChatId = async (userId, chatId) => {
  const result = await pool.query(
    `SELECT * FROM financial_inquiries 
     WHERE user_id = $1 AND chat_id = $2 
     ORDER BY created_at ASC`,
    [userId, chatId]
  );
  return result.rows;
};

const getInquiriesFromDateRange = async (userId, startDate, endDate) => {
  const result = await pool.query(
    `SELECT * FROM financial_inquiries 
    WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
    ORDER BY created_at DESC`,
    [userId, startDate, endDate]
  );
  return result.rows;
};

const getInquiriesByChatIdModel = async (userId, chatId) => {
  const result = await pool.query(
    `SELECT * FROM financial_inquiries 
    WHERE user_id = $1 AND chat_id = $2
    ORDER BY created_at DESC`,
    [userId, chatId]
  );
  return result.rows;
};
module.exports = {
  saveFinancialInquiry,
  getInquiriesByUser,
  getInquiriesFromLast7Days,
  getInquiriesByChatIdModel,
  getChatSessionsByUser,
  getInquiriesFromDateRange,
  getMessagesByChatId,
};

// ==========================================================
// BANTUIN — supabase-config.js
// ==========================================================
// URL dan key di bawah ini adalah "publishable key" (kunci publik),
// BUKAN secret key — memang aman untuk ditaruh langsung di kode
// client-side seperti ini (sama seperti cara kerja Firebase apiKey
// sebelumnya). Proteksi data sebenarnya diatur lewat Row Level
// Security (RLS) di sisi Supabase, bukan dengan menyembunyikan key ini.
// ==========================================================

const SUPABASE_URL = "https://kubydmxgxmvyksyywypi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1YnlkbXhneG12eWtzeXl3eXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MDI1MjYsImV4cCI6MjA5OTM3ODUyNn0.jxafJG54SUeKWc5SL3ORvSzEQIHHmmTzuvia2Boy5cAWS8n";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

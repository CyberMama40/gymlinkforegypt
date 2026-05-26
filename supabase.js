// ============================================================
//  GymLink — Supabase Client Configuration
//  Fill in SUPABASE_URL and SUPABASE_ANON_KEY from your
//  Supabase project: Settings → API
// ============================================================

const SUPABASE_URL = 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

// Initialize the client (loaded via CDN in each HTML page)
// Usage: import this file AFTER the @supabase/supabase-js CDN script
const { createClient } = supabase
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── Auth helpers ────────────────────────────────────────────

async function signUp(email, password, role = 'client') {
  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: { data: { role } }   // 'trainer' or 'client'
  })
  return { data, error }
}

async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password })
  return { data, error }
}

async function signOut() {
  await db.auth.signOut()
  window.location.href = '/index.html'
}

async function getUser() {
  const { data: { user } } = await db.auth.getUser()
  return user
}

// ── Database helpers ─────────────────────────────────────────

// Get all clients for a trainer
async function getClients(trainerId) {
  const { data, error } = await db
    .from('clients')
    .select('*, profiles(*)')
    .eq('trainer_id', trainerId)
  return { data, error }
}

// Get workout plan for a client
async function getWorkoutPlan(clientId) {
  const { data, error } = await db
    .from('workout_plans')
    .select('*, exercises(*)')
    .eq('client_id', clientId)
    .single()
  return { data, error }
}

// Log a workout set
async function logSet(clientId, exerciseId, sets, reps, weight, notes = '') {
  const { data, error } = await db
    .from('workout_logs')
    .insert({ client_id: clientId, exercise_id: exerciseId, sets, reps, weight, notes })
  return { data, error }
}

// Send a message
async function sendMessage(senderId, receiverId, content) {
  const { data, error } = await db
    .from('messages')
    .insert({ sender_id: senderId, receiver_id: receiverId, content })
  return { data, error }
}

// Get messages between two users
async function getMessages(userId1, userId2) {
  const { data, error } = await db
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order('created_at', { ascending: true })
  return { data, error }
}

// ── Realtime ─────────────────────────────────────────────────

// Subscribe to new messages in real-time
function subscribeToMessages(userId, callback) {
  return db
    .channel('messages')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `receiver_id=eq.${userId}`
    }, callback)
    .subscribe()
}

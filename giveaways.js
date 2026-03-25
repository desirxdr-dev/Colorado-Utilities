// giveaways.js
// In-memory giveaway manager (drop-in). Replace with DB if you want persistence.
const giveaways = new Map(); // messageId -> giveaway object

function createGiveaway({ messageId, channelId, hostId, prize, winners = 1, endsAt, link = '' }) {
  const gw = {
    messageId: String(messageId),
    channelId: String(channelId),
    hostId: String(hostId),
    prize,
    winners: Number(winners) || 1,
    endsAt: Number(endsAt),
    link: link || '',
    entries: new Set(),
    finished: false,
    picked: []
  };
  giveaways.set(String(messageId), gw);
  scheduleFinish(gw);
  return gw;
}

function getGiveaway(messageId) {
  return giveaways.get(String(messageId));
}

function addEntry(messageId, userId) {
  const g = getGiveaway(messageId);
  if (!g || g.finished) return false;
  g.entries.add(String(userId));
  return true;
}

function removeEntry(messageId, userId) {
  const g = getGiveaway(messageId);
  if (!g) return false;
  g.entries.delete(String(userId));
  return true;
}

function scheduleFinish(gw) {
  const now = Date.now();
  const delay = Math.max(0, gw.endsAt - now);
  if (delay === 0) {
    setImmediate(() => finishGiveaway(gw.messageId));
    return;
  }
  setTimeout(() => finishGiveaway(gw.messageId), delay);
}

function finishGiveaway(messageId) {
  const g = getGiveaway(messageId);
  if (!g || g.finished) return null;
  g.finished = true;

  const arr = Array.from(g.entries);
  if (arr.length === 0) {
    g.picked = [];
    return g;
  }

  // shuffle (Fisher-Yates)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const take = Math.min(g.winners, arr.length);
  g.picked = arr.slice(0, take);
  return g;
}

function listGiveaways() {
  return Array.from(giveaways.values());
}

function deleteGiveaway(messageId) {
  return giveaways.delete(String(messageId));
}

module.exports = {
  createGiveaway,
  getGiveaway,
  addEntry,
  removeEntry,
  finishGiveaway,
  listGiveaways,
  deleteGiveaway,
  _internal: { giveaways } // debug
};

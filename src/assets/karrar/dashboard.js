<script>
/* cursor */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});
(function loop(){ rx+=(mx-rx)*.11; ry+=(my-ry)*.11; curR.style.left=rx+'px'; curR.style.top=ry+'px'; requestAnimationFrame(loop); })();

/* sidebar active */
document.querySelectorAll('.sb-link').forEach(l => {
  l.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#') e.preventDefault();
    document.querySelectorAll('.sb-link').forEach(x => x.classList.remove('on'));
    this.classList.add('on');
  });
});

/* chat */
function toggleChat() {
  document.getElementById('chat-box').classList.toggle('open');
}
function sendMsg() {
  const inp = document.getElementById('chatInput');
  const val = inp.value.trim();
  if (!val) return;
  const msgs = document.getElementById('chatMsgs');
  const m = document.createElement('div');
  m.className = 'msg me';
  m.innerHTML = `<div class="msg-b">${val}</div><div class="msg-t">You · just now</div>`;
  msgs.appendChild(m);
  msgs.scrollTop = msgs.scrollHeight;
  inp.value = '';
  setTimeout(() => {
    const r = document.createElement('div');
    r.className = 'msg them';
    r.innerHTML = `<div class="msg-b">Got it! I'll get back to you shortly.</div><div class="msg-t">Ali · just now</div>`;
    msgs.appendChild(r);
    msgs.scrollTop = msgs.scrollHeight;
  }, 900);
}

/* animate progress bars on load */
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.prog-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = w, 100);
    });
  }, 300);
});
</script>
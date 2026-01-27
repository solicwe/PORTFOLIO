document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active'); // สำหรับใส่ Animation ปุ่ม (ถ้ามี)
        });
    }

    // ปิดเมนูเมื่อกดลิ้งค์
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 2. Canvas Background Animation (Simple Dots/Grid)
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const dots = [];
        const DOT_COUNT = 50; // จำนวนจุด

        class Dot {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // ความเร็ว X
                this.vy = (Math.random() - 0.5) * 0.5; // ความเร็ว Y
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = '#cbd5e1'; // สีจุด
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Init dots
        for (let i = 0; i < DOT_COUNT; i++) dots.push(new Dot());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            dots.forEach(dot => {
                dot.update();
                dot.draw();
                // วาดเส้นเชื่อมถ้าอยู่ใกล้กัน
                dots.forEach(otherDot => {
                    const dx = dot.x - otherDot.x;
                    const dy = dot.y - otherDot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(203, 213, 225, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(otherDot.x, otherDot.y);
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});
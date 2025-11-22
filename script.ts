// Interfaz para las propiedades del confeti
interface ConfettiProperties {
    x: number;
    y: number;
    color: string;
    size: number;
    speedY: number;
    speedX: number;
}

// Clase para manejar la música de fondo
class MusicPlayer {
    private audio: HTMLAudioElement;
    private controlBtn: HTMLButtonElement | null;
    private isPlaying: boolean;

    constructor() {
        this.audio = document.getElementById('birthdayMusic') as HTMLAudioElement;
        this.controlBtn = document.getElementById('musicControl') as HTMLButtonElement | null;
        this.isPlaying = false;
        this.initControls();
    }

    private initControls(): void {
        if (this.controlBtn) {
            this.controlBtn.addEventListener('click', () => {
                this.toggleMusic();
            });
        }

        // Intentar reproducir automáticamente cuando el usuario interactúa
        document.addEventListener('click', () => {
            if (!this.isPlaying) {
                this.playMusic();
            }
        }, { once: true });

        // También intentar con scroll
        window.addEventListener('scroll', () => {
            if (!this.isPlaying && window.scrollY > 50) {
                this.playMusic();
            }
        }, { once: true });
    }

    private playMusic(): void {
        this.audio.play().then(() => {
            this.isPlaying = true;
            if (this.controlBtn) {
                this.controlBtn.textContent = '🔊';
                this.controlBtn.classList.remove('muted');
            }
        }).catch(error => {
            console.log('No se pudo reproducir automáticamente:', error);
        });
    }

    private pauseMusic(): void {
        this.audio.pause();
        this.isPlaying = false;
        if (this.controlBtn) {
            this.controlBtn.textContent = '🔇';
            this.controlBtn.classList.add('muted');
        }
    }

    private toggleMusic(): void {
        if (this.isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }
}

// Clase para manejar el scroll y revelación de secciones
class PathReveal {
    private sections: NodeListOf<Element>;
    private scrollIndicator: HTMLElement | null;

    constructor() {
        this.sections = document.querySelectorAll('.reveal');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.initScrollObserver();
        this.initScrollListener();
    }

    private initScrollObserver(): void {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    private initScrollListener(): void {
        window.addEventListener('scroll', () => {
            if (this.scrollIndicator && window.scrollY > 100) {
                this.scrollIndicator.style.opacity = '0';
            } else if (this.scrollIndicator) {
                this.scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Interfaz para partículas de fuegos artificiales
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
    alpha: number;
    gravity: number;
    brightness: number;
}

// Clase para manejar los fuegos artificiales con Canvas
class FireworksShow {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private messagesContainer: HTMLElement;
    private fireworksBtn: HTMLButtonElement | null;
    private colors: string[];
    private isActive: boolean;
    private particles: Particle[];
    private animationId: number | null;

    constructor() {
        this.canvas = document.getElementById('fireworksCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.messagesContainer = document.getElementById('fireworksMessages') as HTMLElement;
        this.fireworksBtn = document.getElementById('fireworksBtn') as HTMLButtonElement | null;
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8', '#a29bfe', '#00b894', '#fdcb6e', '#ff7675', '#74b9ff'];
        this.isActive = false;
        this.particles = [];
        this.animationId = null;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.initEventListeners();
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private initEventListeners(): void {
        if (this.fireworksBtn) {
            this.fireworksBtn.addEventListener('click', () => {
                this.startShow();
            });
        }
    }

    private startShow(): void {
        if (this.isActive) return;
        
        this.isActive = true;
        if (this.fireworksBtn) {
            this.fireworksBtn.textContent = '✨ ¡Disfrutando el show! ✨';
            this.fireworksBtn.disabled = true;
        }

        this.animate();

        // Lanzar fuegos artificiales durante 12 segundos
        const duration = 12000;
        const interval = 600;
        let elapsed = 0;

        const fireworkInterval = setInterval(() => {
            this.launchFirework();
            elapsed += interval;

            if (elapsed >= duration) {
                clearInterval(fireworkInterval);
                setTimeout(() => {
                    this.isActive = false;
                    if (this.animationId) {
                        cancelAnimationFrame(this.animationId);
                        this.animationId = null;
                    }
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    if (this.fireworksBtn) {
                        this.fireworksBtn.textContent = '🎆 ¡Fuegos Artificiales! 🎆';
                        this.fireworksBtn.disabled = false;
                    }
                }, 2000);
            }
        }, interval);

        // Lanzar varios al inicio
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.launchFirework(), i * 300);
        }
    }

    private launchFirework(): void {
        const x = Math.random() * this.canvas.width;
        const targetY = Math.random() * (this.canvas.height * 0.3) + (this.canvas.height * 0.1);
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.createExplosion(x, targetY, color);
        this.showEmotiveMessage(x, targetY);
    }

    private showEmotiveMessage(x: number, y: number): void {
        const messages = [
            '¡Nayeli, eres increíble! ✨',
            '¡Feliz cumpleaños Nayeli! 🎂',
            'Nayeli brilla con luz propia 🌟',
            '¡Que todos tus sueños se cumplan! 💫',
            'Nayeli eres muy especial 💖',
            '¡Celebremos tu vida, Nayeli! 🎉',
            'El mundo es mejor contigo 🌈',
            '¡Que este año sea mágico para ti! ✨',
            'Tu sonrisa ilumina todo, Nayeli 😊',
            '¡Mereces lo mejor, Nayeli! 🎁',
            'Nayeli eres única e irrepetible 💝',
            '¡Gracias por existir, Nayeli! 🌺',
            'Tu amistad es un tesoro 💎',
            '¡Que la felicidad te acompañe! 🦋',
            'Nayeli eres luz y alegría ☀️',
            '¡Feliz vuelta al sol, Nayeli! 🌍',
            'Cada día contigo es especial 🌸',
            '¡Brindemos por ti, Nayeli! 🥳',
            'Tu energía es contagiosa ⚡',
            '¡Eres maravillosa, Nayeli! 🌟'
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];
        const messageEl = document.createElement('div');
        
        messageEl.textContent = message;
        messageEl.style.position = 'absolute';
        messageEl.style.left = `${x}px`;
        messageEl.style.top = `${y}px`;
        messageEl.style.transform = 'translate(-50%, -50%)';
        messageEl.style.color = 'white';
        messageEl.style.fontSize = '1.5rem';
        messageEl.style.fontWeight = 'bold';
        messageEl.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)';
        messageEl.style.pointerEvents = 'none';
        messageEl.style.animation = 'fadeUpAndOut 2.5s ease-out forwards';
        messageEl.style.whiteSpace = 'nowrap';

        this.messagesContainer.appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, 2500);
    }

    private createExplosion(x: number, y: number, color: string): void {
        const particleCount = Math.floor(Math.random() * 80) + 100;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const speed = Math.random() * 6 + 3;
            const size = Math.random() * 3 + 2;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: Math.random() * 60 + 60,
                color: color,
                size: size,
                alpha: 1,
                gravity: 0.05,
                brightness: Math.random() * 0.5 + 0.5
            });
        }

        // Agregar partículas secundarias (efecto de estela)
        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            const size = Math.random() * 2 + 1;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: Math.random() * 40 + 40,
                color: '#ffffff',
                size: size,
                alpha: 0.8,
                gravity: 0.03,
                brightness: 1
            });
        }
    }

    private animate(): void {
        if (!this.isActive && this.particles.length === 0) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.life++;
            
            const lifeRatio = p.life / p.maxLife;
            p.alpha = 1 - lifeRatio;
            p.size = p.size * (1 - lifeRatio * 0.5);

            if (p.life >= p.maxLife) {
                this.particles.splice(i, 1);
                continue;
            }

            // Efecto de brillo con gradiente radial
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            gradient.addColorStop(0, this.hexToRgba(p.color, p.alpha * p.brightness));
            gradient.addColorStop(0.5, this.hexToRgba(p.color, p.alpha * p.brightness * 0.5));
            gradient.addColorStop(1, this.hexToRgba(p.color, 0));

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Núcleo brillante
            this.ctx.fillStyle = this.hexToRgba('#ffffff', p.alpha * 0.8);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    private hexToRgba(hex: string, alpha: number): string {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// Clase para manejar la celebración
class BirthdayCelebration {
    private confettiContainer: HTMLElement;
    private celebrateBtn: HTMLButtonElement | null;
    private blowCandlesBtn: HTMLButtonElement | null;
    private colors: string[];

    constructor() {
        this.confettiContainer = document.getElementById('confettiContainer') as HTMLElement;
        this.celebrateBtn = document.getElementById('celebrateBtn') as HTMLButtonElement | null;
        this.blowCandlesBtn = document.getElementById('blowCandlesBtn') as HTMLButtonElement | null;
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8'];
        
        this.initEventListeners();
    }

    private initEventListeners(): void {
        if (this.celebrateBtn) {
            this.celebrateBtn.addEventListener('click', () => {
                this.celebrate();
            });
        }

        if (this.blowCandlesBtn) {
            this.blowCandlesBtn.addEventListener('click', () => {
                this.blowCandles();
            });
        }
    }

    private blowCandles(): void {
        const cake = document.querySelector('.cake-big') as HTMLElement;
        if (cake) {
            cake.classList.add('blown');
            
            setTimeout(() => {
                cake.textContent = '✨';
                cake.classList.remove('blown');
                cake.style.animation = 'pulse 1s ease';
            }, 1000);

            this.createConfetti(50);
        }

        if (this.blowCandlesBtn) {
            this.blowCandlesBtn.textContent = '¡Deseo cumplido! ✨';
            this.blowCandlesBtn.disabled = true;
            
            setTimeout(() => {
                if (this.blowCandlesBtn) {
                    this.blowCandlesBtn.textContent = 'Soplar las velas 💨';
                    this.blowCandlesBtn.disabled = false;
                }
            }, 3000);
        }
    }

    private celebrate(): void {
        // Crear confeti
        this.createConfetti(150);
        
        // Agregar efecto al botón
        if (this.celebrateBtn) {
            this.celebrateBtn.textContent = '¡Yeeeey! 🎊';
            this.celebrateBtn.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                if (this.celebrateBtn) {
                    this.celebrateBtn.textContent = '¡Celebrar! 🎉';
                    this.celebrateBtn.style.transform = 'scale(1)';
                }
            }, 1000);
        }

        // Animar los regalos
        this.animateGifts();
    }

    private createConfetti(count: number): void {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                const props = this.getRandomConfettiProperties();
                
                confetti.style.left = `${props.x}%`;
                confetti.style.backgroundColor = props.color;
                confetti.style.width = `${props.size}px`;
                confetti.style.height = `${props.size}px`;
                confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
                confetti.style.animationDelay = `${Math.random() * 0.5}s`;
                
                this.confettiContainer.appendChild(confetti);
                
                // Remover el confeti después de la animación
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 15);
        }
    }

    private getRandomConfettiProperties(): ConfettiProperties {
        return {
            x: Math.random() * 100,
            y: 0,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2
        };
    }

    private animateGifts(): void {
        const gifts = document.querySelectorAll('.gift');
        gifts.forEach((gift, index) => {
            setTimeout(() => {
                (gift as HTMLElement).style.animation = 'wiggle 0.5s ease';
            }, index * 200);
        });
    }
}

// Clase para agregar interactividad a las tarjetas
class CardInteractions {
    constructor() {
        this.initQualityCards();
        this.initMemoryItems();
        this.initWishItems();
    }

    private initQualityCards(): void {
        const qualityCards = document.querySelectorAll('.quality-card');
        qualityCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                (card as HTMLElement).style.animation = 'pulse 0.5s ease';
            });
        });
    }

    private initMemoryItems(): void {
        const memoryItems = document.querySelectorAll('.memory-item');
        memoryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const messages = [
                    '¡Qué buenos momentos! 😊',
                    '¡Inolvidable! 💖',
                    '¡Siempre en mi corazón! ❤️'
                ];
                alert(messages[index % messages.length]);
            });
        });
    }

    private initWishItems(): void {
        const wishItems = document.querySelectorAll('.wish-item');
        wishItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                (item as HTMLElement).style.animation = 'pulse 0.3s ease';
            });
        });
    }
}

// ===== CLASES PARA LOS NUEVOS EFECTOS =====

// 1. Lluvia de Estrellas y Piñata
class StarsAndPinata {
    private container: HTMLElement;
    private pinataContainer: HTMLElement | null;
    private pinata: HTMLElement | null;
    private pinataHits: HTMLElement | null;
    private hits: number = 0;
    private maxHits: number = 10;

    constructor() {
        this.container = document.querySelector('.stars-container') as HTMLElement;
        this.pinataContainer = document.querySelector('.pinata-container') as HTMLElement;
        this.pinata = document.querySelector('.pinata') as HTMLElement;
        this.pinataHits = document.querySelector('.pinata-hits') as HTMLElement;
        this.initButtons();
    }

    private initButtons(): void {
        const starsBtn = document.querySelector('[data-effect="stars"]') as HTMLButtonElement;
        const pinataBtn = document.querySelector('[data-effect="pinata"]') as HTMLButtonElement;

        if (starsBtn) {
            starsBtn.addEventListener('click', () => this.startStars());
        }

        if (pinataBtn) {
            pinataBtn.addEventListener('click', () => this.showPinata());
        }

        if (this.pinata) {
            this.pinata.addEventListener('click', () => this.hitPinata());
        }
    }

    private startStars(): void {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => this.createStar(), i * 200);
        }
    }

    private createStar(): void {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = '⭐';
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;

        star.addEventListener('click', (e) => {
            this.explodeStar(e.clientX, e.clientY);
            star.remove();
        });

        this.container.appendChild(star);

        setTimeout(() => star.remove(), 4000);
    }

    private explodeStar(x: number, y: number): void {
        const messages = [
            '¡Brillante! ✨',
            '¡Mágico! 🌟',
            '¡Increíble! 💫',
            '¡Wow! ⭐',
            '¡Hermoso! 🌠'
        ];

        const message = document.createElement('div');
        message.classList.add('star-message');
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        message.style.left = `${x}px`;
        message.style.top = `${y}px`;
        message.style.transform = 'translate(-50%, -50%)';

        this.container.appendChild(message);

        setTimeout(() => message.remove(), 2000);
    }

    private showPinata(): void {
        if (this.pinataContainer) {
            this.pinataContainer.classList.add('active');
            this.hits = 0;
            this.updateHits();
        }
    }

    private hitPinata(): void {
        this.hits++;
        this.updateHits();

        if (this.pinata) {
            this.pinata.classList.add('shake');
            setTimeout(() => this.pinata?.classList.remove('shake'), 300);
        }

        if (this.hits >= this.maxHits) {
            this.breakPinata();
        }
    }

    private updateHits(): void {
        if (this.pinataHits) {
            this.pinataHits.textContent = `${this.hits}/${this.maxHits}`;
        }
    }

    private breakPinata(): void {
        // Explosion de confeti y dulces
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const item = document.createElement('div');
                item.textContent = ['🍬', '🍭', '🍫', '🎉', '🎊'][Math.floor(Math.random() * 5)];
                item.style.position = 'fixed';
                item.style.left = '50%';
                item.style.top = '30%';
                item.style.fontSize = '2rem';
                item.style.pointerEvents = 'none';
                item.style.zIndex = '1000';
                
                const angle = (Math.PI * 2 * i) / 50;
                const velocity = 5 + Math.random() * 5;
                
                document.body.appendChild(item);

                let posX = window.innerWidth / 2;
                let posY = window.innerHeight * 0.3;
                let vx = Math.cos(angle) * velocity;
                let vy = Math.sin(angle) * velocity;

                const animate = () => {
                    posX += vx;
                    posY += vy;
                    vy += 0.3; // Gravedad

                    item.style.left = `${posX}px`;
                    item.style.top = `${posY}px`;

                    if (posY < window.innerHeight) {
                        requestAnimationFrame(animate);
                    } else {
                        item.remove();
                    }
                };

                animate();
            }, i * 20);
        }

        if (this.pinataContainer) {
            setTimeout(() => {
                this.pinataContainer?.classList.remove('active');
                this.hits = 0;
                this.updateHits();
            }, 3000);
        }
    }
}

// 2. Corazones Voladores y Caja de Sorpresas
class HeartsAndSurprise {
    private container: HTMLElement;
    private surpriseContainer: HTMLElement | null;
    private surpriseBox: HTMLElement | null;

    constructor() {
        this.container = document.querySelector('.hearts-container') as HTMLElement;
        this.surpriseContainer = document.querySelector('.surprise-box-container') as HTMLElement;
        this.surpriseBox = document.querySelector('.surprise-box') as HTMLElement;
        this.initButtons();
    }

    private initButtons(): void {
        const heartsBtn = document.querySelector('[data-effect="hearts"]') as HTMLButtonElement;
        const surpriseBtn = document.querySelector('[data-effect="surprise"]') as HTMLButtonElement;

        if (heartsBtn) {
            heartsBtn.addEventListener('click', () => this.startHearts());
        }

        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', () => this.showSurprise());
        }

        if (this.surpriseBox) {
            this.surpriseBox.addEventListener('click', () => this.openSurprise());
        }
    }

    private startHearts(): void {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createHeart(), i * 300);
        }
    }

    private createHeart(): void {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = '0';
        heart.style.animationDuration = `${3 + Math.random() * 2}s`;

        this.container.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }

    private showSurprise(): void {
        if (this.surpriseContainer) {
            this.surpriseContainer.classList.add('active');
        }
    }

    private openSurprise(): void {
        const surprises = ['🎁', '🎈', '🎉', '✨', '🌟', '💝', '🎊', '🦋', '🌸', '🎀'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const surprise = document.createElement('div');
                surprise.textContent = surprises[Math.floor(Math.random() * surprises.length)];
                surprise.style.position = 'fixed';
                surprise.style.left = '50%';
                surprise.style.top = '40%';
                surprise.style.fontSize = '2rem';
                surprise.style.pointerEvents = 'none';
                surprise.style.zIndex = '1000';
                
                document.body.appendChild(surprise);

                const angle = (Math.PI * 2 * i) / 15;
                let posX = window.innerWidth / 2;
                let posY = window.innerHeight * 0.4;
                const vx = Math.cos(angle) * 8;
                const vy = Math.sin(angle) * 8;

                const animate = () => {
                    posX += vx;
                    posY += vy;

                    surprise.style.left = `${posX}px`;
                    surprise.style.top = `${posY}px`;
                    surprise.style.opacity = `${Math.max(0, 1 - (Math.abs(posX - window.innerWidth / 2) / 500))}`;

                    if (posX > 0 && posX < window.innerWidth && posY > 0 && posY < window.innerHeight) {
                        requestAnimationFrame(animate);
                    } else {
                        surprise.remove();
                    }
                };

                animate();
            }, i * 100);
        }

        if (this.surpriseContainer) {
            setTimeout(() => this.surpriseContainer?.classList.remove('active'), 2000);
        }
    }
}

// 3. Pétalos Mágicos y Ruleta de Deseos
class PetalsAndRoulette {
    private container: HTMLElement;
    private rouletteContainer: HTMLElement | null;
    private canvas: HTMLCanvasElement | null;
    private ctx: CanvasRenderingContext2D | null;
    private resultDiv: HTMLElement | null;
    private isSpinning: boolean = false;
    private wishes: string[] = [
        '💖 Amor infinito para Nayeli',
        '🌟 Éxito en todo',
        '✈️ Aventuras increíbles',
        '🎯 Sueños cumplidos',
        '🌈 Felicidad plena',
        '💪 Salud y energía',
        '🎨 Creatividad sin límites',
        '🦋 Magia en tu vida'
    ];

    constructor() {
        this.container = document.querySelector('.petals-container') as HTMLElement;
        this.rouletteContainer = document.querySelector('.roulette-container') as HTMLElement;
        this.canvas = document.getElementById('rouletteCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas?.getContext('2d') || null;
        this.resultDiv = document.querySelector('.roulette-result') as HTMLElement;
        this.initButtons();
        this.setupRoulette();
    }

    private initButtons(): void {
        const petalsBtn = document.querySelector('[data-effect="petals"]') as HTMLButtonElement;
        const rouletteBtn = document.querySelector('[data-effect="roulette"]') as HTMLButtonElement;

        if (petalsBtn) {
            petalsBtn.addEventListener('click', () => this.startPetals());
        }

        if (rouletteBtn) {
            rouletteBtn.addEventListener('click', () => this.showRoulette());
        }

        if (this.canvas) {
            this.canvas.addEventListener('click', () => this.spinRoulette());
        }
    }

    private startPetals(): void {
        for (let i = 0; i < 40; i++) {
            setTimeout(() => this.createPetal(), i * 150);
        }
    }

    private createPetal(): void {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = ['🌸', '🌺', '🌼', '🌻', '🏵️', '🌹'][Math.floor(Math.random() * 6)];
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.setProperty('--sway', `${(Math.random() - 0.5) * 200}px`);
        petal.style.animationDuration = `${4 + Math.random() * 2}s`;

        this.container.appendChild(petal);

        setTimeout(() => petal.remove(), 6000);
    }

    private setupRoulette(): void {
        if (this.canvas && this.ctx) {
            this.canvas.width = 300;
            this.canvas.height = 300;
            this.drawRoulette(0);
        }
    }

    private drawRoulette(rotation: number): void {
        if (!this.ctx || !this.canvas) return;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 140;
        const sliceAngle = (Math.PI * 2) / this.wishes.length;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8', '#a29bfe'];

        for (let i = 0; i < this.wishes.length; i++) {
            const startAngle = rotation + i * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // Texto
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + sliceAngle / 2);
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText(this.wishes[i], radius / 1.5, 5);
            this.ctx.restore();
        }

        // Indicador
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - radius - 20);
        this.ctx.lineTo(centerX - 10, centerY - radius);
        this.ctx.lineTo(centerX + 10, centerY - radius);
        this.ctx.closePath();
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fill();
    }

    private showRoulette(): void {
        if (this.rouletteContainer) {
            this.rouletteContainer.classList.add('active');
        }
    }

    private spinRoulette(): void {
        if (this.isSpinning) return;

        this.isSpinning = true;
        if (this.resultDiv) this.resultDiv.textContent = '';

        const spins = 5 + Math.random() * 3;
        const finalRotation = (Math.PI * 2) * spins + Math.random() * Math.PI * 2;
        const duration = 3000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentRotation = finalRotation * easeOut;

            this.drawRoulette(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.showResult(finalRotation);
            }
        };

        animate();
    }

    private showResult(rotation: number): void {
        const sliceAngle = (Math.PI * 2) / this.wishes.length;
        const normalizedRotation = (rotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const selectedIndex = Math.floor((this.wishes.length - normalizedRotation / sliceAngle) % this.wishes.length);

        if (this.resultDiv) {
            this.resultDiv.textContent = `🎉 ${this.wishes[selectedIndex]} 🎉`;
        }
    }
}

// 4. Globos Flotantes y Piano
class BalloonsAndPiano {
    private container: HTMLElement;
    private pianoContainer: HTMLElement | null;
    private audioContext: AudioContext | null = null;

    constructor() {
        this.container = document.querySelector('.balloons-container') as HTMLElement;
        this.pianoContainer = document.querySelector('.piano-container') as HTMLElement;
        this.initButtons();
        this.initPiano();
    }

    private initButtons(): void {
        const balloonsBtn = document.querySelector('[data-effect="balloons"]') as HTMLButtonElement;
        const pianoBtn = document.querySelector('[data-effect="piano"]') as HTMLButtonElement;

        if (balloonsBtn) {
            balloonsBtn.addEventListener('click', () => this.startBalloons());
        }

        if (pianoBtn) {
            pianoBtn.addEventListener('click', () => this.showPiano());
        }
    }

    private startBalloons(): void {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createBalloon(), i * 400);
        }
    }

    private createBalloon(): void {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.textContent = ['🎈', '🎈', '🎈'][Math.floor(Math.random() * 3)];
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.bottom = '0';
        balloon.style.animationDuration = `${5 + Math.random() * 2}s`;

        balloon.addEventListener('click', () => {
            // Explotar globo
            balloon.textContent = '💥';
            setTimeout(() => balloon.remove(), 300);
            
            // Confeti pequeño
            for (let i = 0; i < 8; i++) {
                const confetti = document.createElement('div');
                confetti.textContent = '✨';
                confetti.style.position = 'fixed';
                confetti.style.left = balloon.style.left;
                confetti.style.bottom = `${parseFloat(getComputedStyle(balloon).bottom)}px`;
                confetti.style.fontSize = '1rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                
                this.container.appendChild(confetti);

                const angle = (Math.PI * 2 * i) / 8;
                let x = parseFloat(balloon.style.left);
                let y = window.innerHeight - parseFloat(getComputedStyle(balloon).bottom);

                const animate = () => {
                    x += Math.cos(angle) * 3;
                    y += Math.sin(angle) * 3 + 2;

                    confetti.style.left = `${x}%`;
                    confetti.style.top = `${y}px`;

                    if (y < window.innerHeight) {
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                };

                animate();
            }
        });

        this.container.appendChild(balloon);

        setTimeout(() => balloon.remove(), 7000);
    }

    private showPiano(): void {
        if (this.pianoContainer) {
            this.pianoContainer.classList.add('active');
        }
    }

    private initPiano(): void {
        const keys = document.querySelectorAll('.piano-key');
        const frequencies: {[key: string]: number} = {
            'C': 261.63,
            'D': 293.66,
            'E': 329.63,
            'F': 349.23,
            'G': 392.00,
            'A': 440.00,
            'B': 493.88
        };

        keys.forEach(key => {
            key.addEventListener('click', () => {
                const note = key.getAttribute('data-note');
                if (note) {
                    this.playNote(frequencies[note]);
                    key.classList.add('playing');
                    setTimeout(() => key.classList.remove('playing'), 300);

                    // Efecto visual
                    const visual = document.createElement('div');
                    visual.textContent = '🎵';
                    visual.style.position = 'fixed';
                    visual.style.left = `${(key as HTMLElement).getBoundingClientRect().left}px`;
                    visual.style.top = `${(key as HTMLElement).getBoundingClientRect().top - 30}px`;
                    visual.style.fontSize = '2rem';
                    visual.style.pointerEvents = 'none';
                    visual.style.animation = 'fadeUpOut 1s forwards';
                    visual.style.zIndex = '1000';

                    document.body.appendChild(visual);
                    setTimeout(() => visual.remove(), 1000);
                }
            });
        });
    }

    private playNote(frequency: number): void {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
}

// 5. Mini Juego y Auroras Boreales
class GameAndAurora {
    private canvas: HTMLCanvasElement | null;
    private ctx: CanvasRenderingContext2D | null;
    private gameContainer: HTMLElement | null;
    private auroraCanvas: HTMLCanvasElement | null;
    private auroraCtx: CanvasRenderingContext2D | null;
    private score: number = 0;
    private timeLeft: number = 30;
    private gameActive: boolean = false;
    private gifts: Array<{x: number, y: number, speed: number, emoji: string}> = [];
    private playerX: number = 0;
    private auroraActive: boolean = false;
    private auroraOffset: number = 0;

    constructor() {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas?.getContext('2d') || null;
        this.gameContainer = document.querySelector('.game-container') as HTMLElement;
        this.auroraCanvas = document.getElementById('auroraCanvas') as HTMLCanvasElement;
        this.auroraCtx = this.auroraCanvas?.getContext('2d') || null;
        this.initButtons();
        this.setupCanvas();
        this.setupAuroraCanvas();
    }

    private initButtons(): void {
        const gameBtn = document.querySelector('[data-effect="game"]') as HTMLButtonElement;
        const auroraBtn = document.querySelector('[data-effect="aurora"]') as HTMLButtonElement;

        if (gameBtn) {
            gameBtn.addEventListener('click', () => this.startGame());
        }

        if (auroraBtn) {
            auroraBtn.addEventListener('click', () => this.startAurora());
        }
    }

    private setupCanvas(): void {
        if (this.canvas) {
            this.canvas.width = 500;
            this.canvas.height = 400;

            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas!.getBoundingClientRect();
                this.playerX = e.clientX - rect.left;
            });
        }
    }

    private setupAuroraCanvas(): void {
        if (this.auroraCanvas) {
            this.auroraCanvas.width = window.innerWidth;
            this.auroraCanvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                if (this.auroraCanvas) {
                    this.auroraCanvas.width = window.innerWidth;
                    this.auroraCanvas.height = window.innerHeight;
                }
            });
        }
    }

    private startGame(): void {
        if (this.gameActive) return;

        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 30;
        this.gifts = [];

        if (this.gameContainer) {
            this.gameContainer.classList.add('active');
        }

        this.updateScore();
        this.updateTimer();

        const timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            if (this.timeLeft <= 0) {
                clearInterval(timerInterval);
                this.endGame();
            }
        }, 1000);

        this.gameLoop();
    }

    private gameLoop(): void {
        if (!this.gameActive || !this.ctx || !this.canvas) return;

        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Agregar nuevos regalos
        if (Math.random() < 0.03) {
            this.gifts.push({
                x: Math.random() * (this.canvas.width - 40),
                y: 0,
                speed: 2 + Math.random() * 3,
                emoji: ['🎁', '🎀', '💝'][Math.floor(Math.random() * 3)]
            });
        }

        // Actualizar y dibujar regalos
        for (let i = this.gifts.length - 1; i >= 0; i--) {
            const gift = this.gifts[i];
            gift.y += gift.speed;

            // Dibujar regalo
            this.ctx.font = '30px Arial';
            this.ctx.fillText(gift.emoji, gift.x, gift.y);

            // Detectar colisión con jugador
            const playerY = this.canvas.height - 50;
            if (gift.y > playerY - 30 && gift.y < playerY + 30 &&
                gift.x > this.playerX - 40 && gift.x < this.playerX + 40) {
                this.score += 10;
                this.updateScore();
                this.gifts.splice(i, 1);
                continue;
            }

            // Eliminar si sale del canvas
            if (gift.y > this.canvas.height) {
                this.gifts.splice(i, 1);
            }
        }

        // Dibujar jugador
        this.ctx.font = '40px Arial';
        this.ctx.fillText('🧺', this.playerX - 20, this.canvas.height - 30);

        if (this.gameActive) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    private updateScore(): void {
        const scoreEl = document.getElementById('scoreValue');
        if (scoreEl) scoreEl.textContent = this.score.toString();
    }

    private updateTimer(): void {
        const timerEl = document.getElementById('timerValue');
        if (timerEl) timerEl.textContent = this.timeLeft.toString();
    }

    private endGame(): void {
        this.gameActive = false;
        if (this.ctx && this.canvas) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('¡Juego Terminado!', this.canvas.width / 2, this.canvas.height / 2 - 30);
            this.ctx.font = 'bold 24px Arial';
            this.ctx.fillText(`Puntuación: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Haz clic en el botón para jugar de nuevo', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    }

    private startAurora(): void {
        if (this.auroraActive) {
            this.stopAurora();
            return;
        }

        this.auroraActive = true;
        if (this.auroraCanvas) {
            this.auroraCanvas.classList.add('active');
        }

        this.animateAurora();
    }

    private animateAurora(): void {
        if (!this.auroraActive || !this.auroraCtx || !this.auroraCanvas) return;

        this.auroraCtx.clearRect(0, 0, this.auroraCanvas.width, this.auroraCanvas.height);

        const time = Date.now() * 0.001;
        
        for (let i = 0; i < 3; i++) {
            const gradient = this.auroraCtx.createLinearGradient(
                0, this.auroraCanvas.height * 0.2,
                0, this.auroraCanvas.height * 0.8
            );

            const colors = [
                ['rgba(102, 126, 234, 0.3)', 'rgba(102, 126, 234, 0)'],
                ['rgba(118, 75, 162, 0.3)', 'rgba(118, 75, 162, 0)'],
                ['rgba(240, 147, 251, 0.3)', 'rgba(240, 147, 251, 0)']
            ];

            gradient.addColorStop(0, colors[i][0]);
            gradient.addColorStop(1, colors[i][1]);

            this.auroraCtx.fillStyle = gradient;
            this.auroraCtx.beginPath();

            for (let x = 0; x <= this.auroraCanvas.width; x += 10) {
                const y = this.auroraCanvas.height * 0.3 + 
                         Math.sin(x * 0.01 + time + i) * 50 +
                         Math.sin(x * 0.02 + time * 1.5 + i) * 30;
                
                if (x === 0) {
                    this.auroraCtx.moveTo(x, y);
                } else {
                    this.auroraCtx.lineTo(x, y);
                }
            }

            this.auroraCtx.lineTo(this.auroraCanvas.width, this.auroraCanvas.height);
            this.auroraCtx.lineTo(0, this.auroraCanvas.height);
            this.auroraCtx.closePath();
            this.auroraCtx.fill();
        }

        if (this.auroraActive) {
            requestAnimationFrame(() => this.animateAurora());
        }
    }

    private stopAurora(): void {
        this.auroraActive = false;
        if (this.auroraCanvas) {
            this.auroraCanvas.classList.remove('active');
        }
    }
}

// 6. Mariposas Mágicas
class MagicButterflies {
    private container: HTMLElement;
    private butterflies: Array<{element: HTMLElement, x: number, y: number, vx: number, vy: number}> = [];

    constructor() {
        this.container = document.querySelector('.butterflies-container') as HTMLElement;
        this.initButtons();
    }

    private initButtons(): void {
        const butterfliesBtn = document.querySelector('[data-effect="butterflies"]') as HTMLButtonElement;

        if (butterfliesBtn) {
            butterfliesBtn.addEventListener('click', () => this.startButterflies());
        }
    }

    private startButterflies(): void {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => this.createButterfly(), i * 500);
        }
    }

    private createButterfly(): void {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        butterfly.textContent = '🦋';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        butterfly.style.left = `${x}px`;
        butterfly.style.top = `${y}px`;

        this.container.appendChild(butterfly);

        const butterflyData = {
            element: butterfly,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        };

        this.butterflies.push(butterflyData);

        // Seguir el cursor
        const followCursor = (e: MouseEvent) => {
            const dx = e.clientX - butterflyData.x;
            const dy = e.clientY - butterflyData.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                butterflyData.vx += dx * 0.0001;
                butterflyData.vy += dy * 0.0001;
            }
        };

        document.addEventListener('mousemove', followCursor);

        const animate = () => {
            butterflyData.x += butterflyData.vx;
            butterflyData.y += butterflyData.vy;

            // Bordes
            if (butterflyData.x < 0 || butterflyData.x > window.innerWidth) butterflyData.vx *= -1;
            if (butterflyData.y < 0 || butterflyData.y > window.innerHeight) butterflyData.vy *= -1;

            // Límites
            butterflyData.x = Math.max(0, Math.min(window.innerWidth, butterflyData.x));
            butterflyData.y = Math.max(0, Math.min(window.innerHeight, butterflyData.y));

            butterfly.style.left = `${butterflyData.x}px`;
            butterfly.style.top = `${butterflyData.y}px`;

            if (document.body.contains(butterfly)) {
                requestAnimationFrame(animate);
            } else {
                document.removeEventListener('mousemove', followCursor);
            }
        };

        animate();

        setTimeout(() => {
            butterfly.remove();
            const index = this.butterflies.indexOf(butterflyData);
            if (index > -1) this.butterflies.splice(index, 1);
            document.removeEventListener('mousemove', followCursor);
        }, 15000);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = new MusicPlayer();
    const pathReveal = new PathReveal();
    const celebration = new BirthdayCelebration();
    const cardInteractions = new CardInteractions();
    const fireworks = new FireworksShow();
    
    // Nuevos efectos
    const starsAndPinata = new StarsAndPinata();
    const heartsAndSurprise = new HeartsAndSurprise();
    const petalsAndRoulette = new PetalsAndRoulette();
    const balloonsAndPiano = new BalloonsAndPiano();
    const gameAndAurora = new GameAndAurora();
    const butterflies = new MagicButterflies();
    
    console.log('🎉 ¡Página de cumpleaños cargada exitosamente!');
    console.log('🛤️ ¡Comienza el viaje de celebración!');
    console.log('🎵 Música lista para reproducir');
    console.log('✨ ¡Todos los efectos están listos!');
});

// Clase para manejar la música de fondo
var MusicPlayer = /** @class */ (function () {
    function MusicPlayer() {
        this.audio = document.getElementById('birthdayMusic');
        this.controlBtn = document.getElementById('musicControl');
        this.isPlaying = false;
        this.initControls();
    }
    MusicPlayer.prototype.initControls = function () {
        var _this = this;
        if (this.controlBtn) {
            this.controlBtn.addEventListener('click', function () {
                _this.toggleMusic();
            });
        }
    };
    MusicPlayer.prototype.startMusic = function () {
        this.playMusic();
    };
    MusicPlayer.prototype.playMusic = function () {
        var _this = this;
        this.audio.play().then(function () {
            _this.isPlaying = true;
            if (_this.controlBtn) {
                _this.controlBtn.textContent = '🔊';
                _this.controlBtn.classList.remove('muted');
            }
            console.log('🎵 Música reproduciéndose...');
        }).catch(function (error) {
            console.log('⚠️ No se pudo reproducir automáticamente:', error);
        });
    };
    MusicPlayer.prototype.pauseMusic = function () {
        this.audio.pause();
        this.isPlaying = false;
        if (this.controlBtn) {
            this.controlBtn.textContent = '🔇';
            this.controlBtn.classList.add('muted');
        }
    };
    MusicPlayer.prototype.toggleMusic = function () {
        if (this.isPlaying) {
            this.pauseMusic();
        }
        else {
            this.playMusic();
        }
    };
    return MusicPlayer;
}());
// Clase para manejar el scroll y revelación de secciones
var PathReveal = /** @class */ (function () {
    function PathReveal() {
        this.sections = document.querySelectorAll('.reveal');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.initScrollObserver();
        this.initScrollListener();
    }
    PathReveal.prototype.initScrollObserver = function () {
        var observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        this.sections.forEach(function (section) {
            observer.observe(section);
        });
    };
    PathReveal.prototype.initScrollListener = function () {
        var _this = this;
        window.addEventListener('scroll', function () {
            if (_this.scrollIndicator && window.scrollY > 100) {
                _this.scrollIndicator.style.opacity = '0';
            }
            else if (_this.scrollIndicator) {
                _this.scrollIndicator.style.opacity = '1';
            }
        });
    };
    return PathReveal;
}());
// Clase para manejar los fuegos artificiales con Canvas
var FireworksShow = /** @class */ (function () {
    function FireworksShow() {
        var _this = this;
        this.canvas = document.getElementById('fireworksCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.messagesContainer = document.getElementById('fireworksMessages');
        this.fireworksBtn = document.getElementById('fireworksBtn');
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8', '#a29bfe', '#00b894', '#fdcb6e', '#ff7675', '#74b9ff'];
        this.isActive = false;
        this.particles = [];
        this.animationId = null;
        this.resizeCanvas();
        window.addEventListener('resize', function () { return _this.resizeCanvas(); });
        this.initEventListeners();
    }
    FireworksShow.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };
    FireworksShow.prototype.initEventListeners = function () {
        var _this = this;
        if (this.fireworksBtn) {
            this.fireworksBtn.addEventListener('click', function () {
                _this.startShow();
            });
        }
    };
    FireworksShow.prototype.startShow = function () {
        var _this = this;
        if (this.isActive)
            return;
        this.isActive = true;
        if (this.fireworksBtn) {
            this.fireworksBtn.textContent = '✨ ¡Disfrutando el show! ✨';
            this.fireworksBtn.disabled = true;
        }
        this.animate();
        // Lanzar fuegos artificiales durante 25 segundos
        var duration = 25000;
        var interval = 500;
        var elapsed = 0;
        var fireworkInterval = setInterval(function () {
            _this.launchFirework();
            elapsed += interval;
            if (elapsed >= duration) {
                clearInterval(fireworkInterval);
                setTimeout(function () {
                    _this.isActive = false;
                    if (_this.animationId) {
                        cancelAnimationFrame(_this.animationId);
                        _this.animationId = null;
                    }
                    _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                    if (_this.fireworksBtn) {
                        _this.fireworksBtn.textContent = '🎆 ¡Fuegos Artificiales! 🎆';
                        _this.fireworksBtn.disabled = false;
                    }
                }, 2000);
            }
        }, interval);
        // Lanzar varios al inicio
        for (var i = 0; i < 3; i++) {
            setTimeout(function () { return _this.launchFirework(); }, i * 300);
        }
    };
    FireworksShow.prototype.launchFirework = function () {
        var x = Math.random() * this.canvas.width;
        var targetY = Math.random() * (this.canvas.height * 0.3) + (this.canvas.height * 0.1);
        var color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.createExplosion(x, targetY, color);
        this.showEmotiveMessage(x, targetY);
    };
    FireworksShow.prototype.showEmotiveMessage = function (x, y) {
        var messages = [
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
        var message = messages[Math.floor(Math.random() * messages.length)];
        var messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.position = 'absolute';
        messageEl.style.left = "".concat(x, "px");
        messageEl.style.top = "".concat(y, "px");
        messageEl.style.transform = 'translate(-50%, -50%)';
        messageEl.style.color = 'white';
        messageEl.style.fontSize = '1.5rem';
        messageEl.style.fontWeight = 'bold';
        messageEl.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)';
        messageEl.style.pointerEvents = 'none';
        messageEl.style.animation = 'fadeUpAndOut 2.5s ease-out forwards';
        messageEl.style.whiteSpace = 'nowrap';
        this.messagesContainer.appendChild(messageEl);
        setTimeout(function () {
            messageEl.remove();
        }, 2500);
    };
    FireworksShow.prototype.createExplosion = function (x, y, color) {
        var particleCount = Math.floor(Math.random() * 80) + 100;
        for (var i = 0; i < particleCount; i++) {
            var angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            var speed = Math.random() * 6 + 3;
            var size = Math.random() * 3 + 2;
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
        for (var i = 0; i < 40; i++) {
            var angle = Math.random() * Math.PI * 2;
            var speed = Math.random() * 2 + 1;
            var size = Math.random() * 2 + 1;
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
    };
    FireworksShow.prototype.animate = function () {
        var _this = this;
        if (!this.isActive && this.particles.length === 0)
            return;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.life++;
            var lifeRatio = p.life / p.maxLife;
            p.alpha = 1 - lifeRatio;
            p.size = p.size * (1 - lifeRatio * 0.5);
            if (p.life >= p.maxLife) {
                this.particles.splice(i, 1);
                continue;
            }
            // Efecto de brillo con gradiente radial
            var gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
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
        this.animationId = requestAnimationFrame(function () { return _this.animate(); });
    };
    FireworksShow.prototype.hexToRgba = function (hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
    };
    return FireworksShow;
}());
// Clase para manejar la celebración
var BirthdayCelebration = /** @class */ (function () {
    function BirthdayCelebration() {
        this.confettiContainer = document.getElementById('confettiContainer');
        this.celebrateBtn = document.getElementById('celebrateBtn');
        this.blowCandlesBtn = document.getElementById('blowCandlesBtn');
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8'];
        this.initEventListeners();
    }
    BirthdayCelebration.prototype.initEventListeners = function () {
        var _this = this;
        if (this.celebrateBtn) {
            this.celebrateBtn.addEventListener('click', function () {
                _this.celebrate();
            });
        }
        if (this.blowCandlesBtn) {
            this.blowCandlesBtn.addEventListener('click', function () {
                _this.blowCandles();
            });
        }
    };
    BirthdayCelebration.prototype.blowCandles = function () {
        var _this = this;
        var cake = document.querySelector('.cake-big');
        if (cake) {
            cake.classList.add('blown');
            setTimeout(function () {
                cake.textContent = '✨';
                cake.classList.remove('blown');
                cake.style.animation = 'pulse 1s ease';
            }, 1000);
            this.createConfetti(50);
        }
        if (this.blowCandlesBtn) {
            this.blowCandlesBtn.textContent = '¡Deseo cumplido! ✨';
            this.blowCandlesBtn.disabled = true;
            setTimeout(function () {
                if (_this.blowCandlesBtn) {
                    _this.blowCandlesBtn.textContent = 'Soplar las velas 💨';
                    _this.blowCandlesBtn.disabled = false;
                }
            }, 3000);
        }
    };
    BirthdayCelebration.prototype.celebrate = function () {
        var _this = this;
        // Crear confeti
        this.createConfetti(150);
        // Agregar efecto al botón
        if (this.celebrateBtn) {
            this.celebrateBtn.textContent = '¡Yeeeey! 🎊';
            this.celebrateBtn.style.transform = 'scale(1.2)';
            setTimeout(function () {
                if (_this.celebrateBtn) {
                    _this.celebrateBtn.textContent = '¡Celebrar! 🎉';
                    _this.celebrateBtn.style.transform = 'scale(1)';
                }
            }, 1000);
        }
        // Animar los regalos
        this.animateGifts();
    };
    BirthdayCelebration.prototype.createConfetti = function (count) {
        var _this = this;
        for (var i = 0; i < count; i++) {
            setTimeout(function () {
                var confetti = document.createElement('div');
                confetti.classList.add('confetti');
                var props = _this.getRandomConfettiProperties();
                confetti.style.left = "".concat(props.x, "%");
                confetti.style.backgroundColor = props.color;
                confetti.style.width = "".concat(props.size, "px");
                confetti.style.height = "".concat(props.size, "px");
                confetti.style.animationDuration = "".concat(2 + Math.random() * 2, "s");
                confetti.style.animationDelay = "".concat(Math.random() * 0.5, "s");
                _this.confettiContainer.appendChild(confetti);
                // Remover el confeti después de la animación
                setTimeout(function () {
                    confetti.remove();
                }, 4000);
            }, i * 15);
        }
    };
    BirthdayCelebration.prototype.getRandomConfettiProperties = function () {
        return {
            x: Math.random() * 100,
            y: 0,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2
        };
    };
    BirthdayCelebration.prototype.animateGifts = function () {
        var gifts = document.querySelectorAll('.gift');
        gifts.forEach(function (gift, index) {
            setTimeout(function () {
                gift.style.animation = 'wiggle 0.5s ease';
            }, index * 200);
        });
    };
    return BirthdayCelebration;
}());
// Clase para agregar interactividad a las tarjetas
var CardInteractions = /** @class */ (function () {
    function CardInteractions() {
        this.initQualityCards();
        this.initMemoryItems();
        this.initWishItems();
    }
    CardInteractions.prototype.initQualityCards = function () {
        var qualityCards = document.querySelectorAll('.quality-card');
        qualityCards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                card.style.animation = 'pulse 0.5s ease';
            });
        });
    };
    CardInteractions.prototype.initMemoryItems = function () {
        var memoryItems = document.querySelectorAll('.memory-item');
        memoryItems.forEach(function (item, index) {
            item.addEventListener('click', function () {
                var messages = [
                    '¡Qué buenos momentos! 😊',
                    '¡Inolvidable! 💖',
                    '¡Siempre en mi corazón! ❤️'
                ];
                alert(messages[index % messages.length]);
            });
        });
    };
    CardInteractions.prototype.initWishItems = function () {
        var wishItems = document.querySelectorAll('.wish-item');
        wishItems.forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                item.style.animation = 'pulse 0.3s ease';
            });
        });
    };
    return CardInteractions;
}());
// ===== CLASES PARA LOS NUEVOS EFECTOS =====
// 1. Lluvia de Estrellas y Piñata
var StarsAndPinata = /** @class */ (function () {
    function StarsAndPinata() {
        this.hits = 0;
        this.maxHits = 10;
        this.container = document.querySelector('.stars-container');
        this.pinataContainer = document.querySelector('.pinata-container');
        this.pinata = document.querySelector('.pinata');
        this.pinataHits = document.querySelector('.pinata-hits');
        this.initButtons();
    }
    StarsAndPinata.prototype.initButtons = function () {
        var _this = this;
        var starsBtn = document.querySelector('[data-effect="stars"]');
        var pinataBtn = document.querySelector('[data-effect="pinata"]');
        if (starsBtn) {
            starsBtn.addEventListener('click', function () { return _this.startStars(); });
        }
        if (pinataBtn) {
            pinataBtn.addEventListener('click', function () { return _this.showPinata(); });
        }
        if (this.pinata) {
            this.pinata.addEventListener('click', function () { return _this.hitPinata(); });
        }
    };
    StarsAndPinata.prototype.startStars = function () {
        var _this = this;
        for (var i = 0; i < 30; i++) {
            setTimeout(function () { return _this.createStar(); }, i * 200);
        }
    };
    StarsAndPinata.prototype.createStar = function () {
        var _this = this;
        var star = document.createElement('div');
        star.classList.add('star');
        star.textContent = '⭐';
        star.style.left = "".concat(Math.random() * 100, "%");
        star.style.animationDuration = "".concat(2 + Math.random() * 2, "s");
        star.addEventListener('click', function (e) {
            _this.explodeStar(e.clientX, e.clientY);
            star.remove();
        });
        this.container.appendChild(star);
        setTimeout(function () { return star.remove(); }, 4000);
    };
    StarsAndPinata.prototype.explodeStar = function (x, y) {
        var messages = [
            '¡Brillante! ✨',
            '¡Mágico! 🌟',
            '¡Increíble! 💫',
            '¡Wow! ⭐',
            '¡Hermoso! 🌠'
        ];
        var message = document.createElement('div');
        message.classList.add('star-message');
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        message.style.left = "".concat(x, "px");
        message.style.top = "".concat(y, "px");
        message.style.transform = 'translate(-50%, -50%)';
        this.container.appendChild(message);
        setTimeout(function () { return message.remove(); }, 2000);
    };
    StarsAndPinata.prototype.showPinata = function () {
        if (this.pinataContainer) {
            this.pinataContainer.classList.add('active');
            this.hits = 0;
            this.updateHits();
        }
    };
    StarsAndPinata.prototype.hitPinata = function () {
        var _this = this;
        this.hits++;
        this.updateHits();
        if (this.pinata) {
            this.pinata.classList.add('shake');
            setTimeout(function () { var _a; return (_a = _this.pinata) === null || _a === void 0 ? void 0 : _a.classList.remove('shake'); }, 300);
        }
        if (this.hits >= this.maxHits) {
            this.breakPinata();
        }
    };
    StarsAndPinata.prototype.updateHits = function () {
        if (this.pinataHits) {
            this.pinataHits.textContent = "".concat(this.hits, "/").concat(this.maxHits);
        }
    };
    StarsAndPinata.prototype.breakPinata = function () {
        var _this = this;
        var _loop_1 = function (i) {
            setTimeout(function () {
                var item = document.createElement('div');
                item.textContent = ['🍬', '🍭', '🍫', '🎉', '🎊'][Math.floor(Math.random() * 5)];
                item.style.position = 'fixed';
                item.style.left = '50%';
                item.style.top = '30%';
                item.style.fontSize = '2rem';
                item.style.pointerEvents = 'none';
                item.style.zIndex = '1000';
                var angle = (Math.PI * 2 * i) / 50;
                var velocity = 5 + Math.random() * 5;
                document.body.appendChild(item);
                var posX = window.innerWidth / 2;
                var posY = window.innerHeight * 0.3;
                var vx = Math.cos(angle) * velocity;
                var vy = Math.sin(angle) * velocity;
                var animate = function () {
                    posX += vx;
                    posY += vy;
                    vy += 0.3; // Gravedad
                    item.style.left = "".concat(posX, "px");
                    item.style.top = "".concat(posY, "px");
                    if (posY < window.innerHeight) {
                        requestAnimationFrame(animate);
                    }
                    else {
                        item.remove();
                    }
                };
                animate();
            }, i * 20);
        };
        // Explosion de confeti y dulces
        for (var i = 0; i < 50; i++) {
            _loop_1(i);
        }
        if (this.pinataContainer) {
            setTimeout(function () {
                var _a;
                (_a = _this.pinataContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
                _this.hits = 0;
                _this.updateHits();
            }, 3000);
        }
    };
    return StarsAndPinata;
}());
// 2. Corazones Voladores y Caja de Sorpresas
var HeartsAndSurprise = /** @class */ (function () {
    function HeartsAndSurprise() {
        this.container = document.querySelector('.hearts-container');
        this.surpriseContainer = document.querySelector('.surprise-box-container');
        this.surpriseBox = document.querySelector('.surprise-box');
        this.initButtons();
    }
    HeartsAndSurprise.prototype.initButtons = function () {
        var _this = this;
        var heartsBtn = document.querySelector('[data-effect="hearts"]');
        var surpriseBtn = document.querySelector('[data-effect="surprise"]');
        if (heartsBtn) {
            heartsBtn.addEventListener('click', function () { return _this.startHearts(); });
        }
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', function () { return _this.showSurprise(); });
        }
        if (this.surpriseBox) {
            this.surpriseBox.addEventListener('click', function () { return _this.openSurprise(); });
        }
    };
    HeartsAndSurprise.prototype.startHearts = function () {
        var _this = this;
        for (var i = 0; i < 20; i++) {
            setTimeout(function () { return _this.createHeart(); }, i * 300);
        }
    };
    HeartsAndSurprise.prototype.createHeart = function () {
        var heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = "".concat(Math.random() * 100, "%");
        heart.style.bottom = '0';
        heart.style.animationDuration = "".concat(3 + Math.random() * 2, "s");
        this.container.appendChild(heart);
        setTimeout(function () { return heart.remove(); }, 5000);
    };
    HeartsAndSurprise.prototype.showSurprise = function () {
        if (this.surpriseContainer) {
            this.surpriseContainer.classList.add('active');
        }
    };
    HeartsAndSurprise.prototype.openSurprise = function () {
        var _this = this;
        var surpriseMessages = [
            '¡Sorpresa! 🎉',
            '¡Feliz cumpleaños Nayeli! 🎂',
            '¡Una sorpresa especial para ti! ✨',
            '¡Mágia y alegría! 🌟',
            '¡Momentos inolvidables! 💝'
        ];
        var randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        // Crear mensaje en el centro
        var centerMessage = document.createElement('div');
        centerMessage.textContent = randomMessage;
        centerMessage.style.position = 'fixed';
        centerMessage.style.left = '50%';
        centerMessage.style.top = '40%';
        centerMessage.style.transform = 'translate(-50%, -50%)';
        centerMessage.style.fontSize = '2.5rem';
        centerMessage.style.fontWeight = 'bold';
        centerMessage.style.color = '#ff6b6b';
        centerMessage.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)';
        centerMessage.style.pointerEvents = 'none';
        centerMessage.style.zIndex = '1000';
        centerMessage.style.animation = 'surpriseMessage 2s ease-out forwards';
        document.body.appendChild(centerMessage);
        var surprises = ['🎁', '🎈', '🎉', '✨', '🌟', '💝', '🎊', '🦋', '🌸', '🎀'];
        var _loop_2 = function (i) {
            setTimeout(function () {
                var surprise = document.createElement('div');
                surprise.textContent = surprises[Math.floor(Math.random() * surprises.length)];
                surprise.style.position = 'fixed';
                surprise.style.left = '50%';
                surprise.style.top = '40%';
                surprise.style.fontSize = '2rem';
                surprise.style.pointerEvents = 'none';
                surprise.style.zIndex = '1000';
                document.body.appendChild(surprise);
                var angle = (Math.PI * 2 * i) / 15;
                var posX = window.innerWidth / 2;
                var posY = window.innerHeight * 0.4;
                var vx = Math.cos(angle) * 8;
                var vy = Math.sin(angle) * 8;
                var animate = function () {
                    posX += vx;
                    posY += vy;
                    surprise.style.left = "".concat(posX, "px");
                    surprise.style.top = "".concat(posY, "px");
                    surprise.style.opacity = "".concat(Math.max(0, 1 - (Math.abs(posX - window.innerWidth / 2) / 500)));
                    if (posX > 0 && posX < window.innerWidth && posY > 0 && posY < window.innerHeight) {
                        requestAnimationFrame(animate);
                    }
                    else {
                        surprise.remove();
                    }
                };
                animate();
            }, i * 100);
        };
        for (var i = 0; i < 15; i++) {
            _loop_2(i);
        }
        // Remover mensaje después de la animación
        setTimeout(function () { return centerMessage.remove(); }, 2000);
        if (this.surpriseContainer) {
            setTimeout(function () { var _a; return (_a = _this.surpriseContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('active'); }, 2000);
        }
    };
    return HeartsAndSurprise;
}());
// 3. Pétalos Mágicos y Ruleta de Deseos
var PetalsAndRoulette = /** @class */ (function () {
    function PetalsAndRoulette() {
        var _a;
        this.isSpinning = false;
        this.wishes = [
            '💖 Amor infinito para Nayeli',
            '🌟 Éxito en todo',
            '✈️ Aventuras increíbles',
            '🎯 Sueños cumplidos',
            '🌈 Felicidad plena',
            '💪 Salud y energía',
            '🎨 Creatividad sin límites',
            '🦋 Magia en tu vida'
        ];
        this.container = document.querySelector('.petals-container');
        this.rouletteContainer = document.querySelector('.roulette-container');
        this.canvas = document.getElementById('rouletteCanvas');
        this.ctx = ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getContext('2d')) || null;
        this.resultDiv = document.querySelector('.roulette-result');
        this.initButtons();
        this.setupRoulette();
    }
    PetalsAndRoulette.prototype.initButtons = function () {
        var _this = this;
        var petalsBtn = document.querySelector('[data-effect="petals"]');
        var rouletteBtn = document.querySelector('[data-effect="roulette"]');
        if (petalsBtn) {
            petalsBtn.addEventListener('click', function () { return _this.startPetals(); });
        }
        if (rouletteBtn) {
            rouletteBtn.addEventListener('click', function () { return _this.showRoulette(); });
        }
        if (this.canvas) {
            this.canvas.addEventListener('click', function () { return _this.spinRoulette(); });
        }
    };
    PetalsAndRoulette.prototype.startPetals = function () {
        var _this = this;
        for (var i = 0; i < 40; i++) {
            setTimeout(function () { return _this.createPetal(); }, i * 150);
        }
    };
    PetalsAndRoulette.prototype.createPetal = function () {
        var petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = ['🌸', '🌺', '🌼', '🌻', '🏵️', '🌹'][Math.floor(Math.random() * 6)];
        petal.style.left = "".concat(Math.random() * 100, "%");
        petal.style.setProperty('--sway', "".concat((Math.random() - 0.5) * 200, "px"));
        petal.style.animationDuration = "".concat(4 + Math.random() * 2, "s");
        this.container.appendChild(petal);
        setTimeout(function () { return petal.remove(); }, 6000);
    };
    PetalsAndRoulette.prototype.setupRoulette = function () {
        var _this = this;
        if (this.canvas && this.ctx) {
            var updateSize = function () {
                var containerWidth = _this.rouletteContainer ? _this.rouletteContainer.clientWidth : 300;
                var size = Math.min(containerWidth, 300);
                _this.canvas.width = size;
                _this.canvas.height = size;
                _this.drawRoulette(0);
            };
            
            updateSize();
            window.addEventListener('resize', updateSize);
        }
    };
    PetalsAndRoulette.prototype.drawRoulette = function (rotation) {
        if (!this.ctx || !this.canvas)
            return;
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var radius = 140;
        var sliceAngle = (Math.PI * 2) / this.wishes.length;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8', '#a29bfe'];
        for (var i = 0; i < this.wishes.length; i++) {
            var startAngle = rotation + i * sliceAngle;
            var endAngle = startAngle + sliceAngle;
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
        // Indicador (a la derecha, 1/4 de vuelta)
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + radius + 20, centerY); // punta del indicador
        this.ctx.lineTo(centerX + radius, centerY - 10);
        this.ctx.lineTo(centerX + radius, centerY + 10);
        this.ctx.closePath();
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fill();
    };
    PetalsAndRoulette.prototype.showRoulette = function () {
        if (this.rouletteContainer) {
            this.rouletteContainer.classList.add('active');
        }
    };
    PetalsAndRoulette.prototype.spinRoulette = function () {
        var _this = this;
        if (this.isSpinning)
            return;
        this.isSpinning = true;
        if (this.resultDiv)
            this.resultDiv.textContent = '';
        var spins = 5 + Math.random() * 3;
        var finalRotation = (Math.PI * 2) * spins + Math.random() * Math.PI * 2;
        var duration = 3000;
        var startTime = Date.now();
        var animate = function () {
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var currentRotation = finalRotation * easeOut;
            _this.drawRoulette(currentRotation);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
            else {
                _this.isSpinning = false;
                _this.showResult(finalRotation);
            }
        };
        animate();
    };
    PetalsAndRoulette.prototype.showResult = function (rotation) {
        var twoPi = Math.PI * 2;
        var sliceAngle = twoPi / this.wishes.length;
        // Normalizamos la rotación al rango [0, 2π)
        var rot = ((rotation % twoPi) + twoPi) % twoPi;
        // El indicador está a la derecha (ángulo 0 rad). Calculamos el ángulo efectivo bajo el puntero
        var angleUnderPointer = (twoPi - rot) % twoPi;
        var selectedIndex = Math.floor(angleUnderPointer / sliceAngle) % this.wishes.length;
        if (this.resultDiv) {
            this.resultDiv.textContent = "\uD83C\uDF89 ".concat(this.wishes[selectedIndex], " \uD83C\uDF89");
        }
    };
    return PetalsAndRoulette;
}());
// 4. Globos Flotantes y Piano
var BalloonsAndPiano = /** @class */ (function () {
    function BalloonsAndPiano() {
        this.audioContext = null;
        this.container = document.querySelector('.balloons-container');
        this.pianoContainer = document.querySelector('.piano-container');
        this.initButtons();
        this.initPiano();
    }
    BalloonsAndPiano.prototype.initButtons = function () {
        var _this = this;
        var balloonsBtn = document.querySelector('[data-effect="balloons"]');
        var pianoBtn = document.querySelector('[data-effect="piano"]');
        if (balloonsBtn) {
            balloonsBtn.addEventListener('click', function () { return _this.startBalloons(); });
        }
        if (pianoBtn) {
            pianoBtn.addEventListener('click', function () { return _this.showPiano(); });
        }
    };
    BalloonsAndPiano.prototype.startBalloons = function () {
        var _this = this;
        for (var i = 0; i < 15; i++) {
            setTimeout(function () { return _this.createBalloon(); }, i * 400);
        }
    };
    BalloonsAndPiano.prototype.createBalloon = function () {
        var _this = this;
        var balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.textContent = ['🎈', '🎈', '🎈'][Math.floor(Math.random() * 3)];
        balloon.style.left = "".concat(Math.random() * 100, "%");
        balloon.style.bottom = '0';
        balloon.style.animationDuration = "".concat(5 + Math.random() * 2, "s");
        balloon.addEventListener('click', function () {
            // Explotar globo
            balloon.textContent = '💥';
            setTimeout(function () { return balloon.remove(); }, 300);
            var _loop_3 = function (i) {
                var confetti = document.createElement('div');
                confetti.textContent = '✨';
                confetti.style.position = 'fixed';
                confetti.style.left = balloon.style.left;
                confetti.style.bottom = "".concat(parseFloat(getComputedStyle(balloon).bottom), "px");
                confetti.style.fontSize = '1rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                _this.container.appendChild(confetti);
                var angle = (Math.PI * 2 * i) / 8;
                var x = parseFloat(balloon.style.left);
                var y = window.innerHeight - parseFloat(getComputedStyle(balloon).bottom);
                var animate = function () {
                    x += Math.cos(angle) * 3;
                    y += Math.sin(angle) * 3 + 2;
                    confetti.style.left = "".concat(x, "%");
                    confetti.style.top = "".concat(y, "px");
                    if (y < window.innerHeight) {
                        requestAnimationFrame(animate);
                    }
                    else {
                        confetti.remove();
                    }
                };
                animate();
            };
            // Confeti pequeño
            for (var i = 0; i < 8; i++) {
                _loop_3(i);
            }
        });
        this.container.appendChild(balloon);
        setTimeout(function () { return balloon.remove(); }, 7000);
    };
    BalloonsAndPiano.prototype.showPiano = function () {
        if (this.pianoContainer) {
            this.pianoContainer.classList.add('active');
        }
    };
    BalloonsAndPiano.prototype.initPiano = function () {
        var _this = this;
        var keys = document.querySelectorAll('.piano-key');
        var frequencies = {
            'C': 261.63,
            'D': 293.66,
            'E': 329.63,
            'F': 349.23,
            'G': 392.00,
            'A': 440.00,
            'B': 493.88
        };
        keys.forEach(function (key) {
            key.addEventListener('click', function () {
                var note = key.getAttribute('data-note');
                if (note) {
                    _this.playNote(frequencies[note]);
                    key.classList.add('playing');
                    setTimeout(function () { return key.classList.remove('playing'); }, 300);
                    // Efecto visual mejorado con partículas
                    var keyRect = key.getBoundingClientRect();
                    var centerX = keyRect.left + keyRect.width / 2;
                    var centerY_1 = keyRect.top;
                    var _loop_4 = function (i) {
                        var particle = document.createElement('div');
                        particle.textContent = ['🎵', '⭐', '✨', '💫', '🌟', '🎶', '🎼', '🎹'][Math.floor(Math.random() * 8)];
                        particle.style.position = 'fixed';
                        particle.style.left = "".concat(centerX, "px");
                        particle.style.top = "".concat(centerY_1, "px");
                        particle.style.fontSize = '1.5rem';
                        particle.style.pointerEvents = 'none';
                        particle.style.zIndex = '1000';
                        particle.style.color = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#fd79a8', '#a29bfe'][Math.floor(Math.random() * 8)];
                        document.body.appendChild(particle);
                        var angle = (Math.PI * 2 * i) / 8;
                        var velocity = 2 + Math.random() * 3;
                        var posX = centerX;
                        var posY = centerY_1;
                        var vx = Math.cos(angle) * velocity;
                        var vy = Math.sin(angle) * velocity - 1; // Un poco hacia arriba
                        var animate = function () {
                            posX += vx;
                            posY += vy;
                            vy += 0.1; // Gravedad ligera
                            particle.style.left = "".concat(posX, "px");
                            particle.style.top = "".concat(posY, "px");
                            particle.style.opacity = "".concat(Math.max(0, 1 - (centerY_1 - posY) / 200));
                            if (posY < window.innerHeight && posY > 0) {
                                requestAnimationFrame(animate);
                            }
                            else {
                                particle.remove();
                            }
                        };
                        animate();
                    };
                    for (var i = 0; i < 8; i++) {
                        _loop_4(i);
                    }
                }
            });
        });
    };
    BalloonsAndPiano.prototype.playNote = function (frequency) {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        var oscillator = this.audioContext.createOscillator();
        var gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    };
    return BalloonsAndPiano;
}());
// 5. Mini Juego y Auroras Boreales
var GameAndAurora = /** @class */ (function () {
    function GameAndAurora() {
        var _a, _b;
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.gifts = [];
        this.playerX = 0;
        this.auroraActive = false;
        this.auroraOffset = 0;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getContext('2d')) || null;
        this.gameContainer = document.querySelector('.game-container');
        this.auroraCanvas = document.getElementById('auroraCanvas');
        this.auroraCtx = ((_b = this.auroraCanvas) === null || _b === void 0 ? void 0 : _b.getContext('2d')) || null;
        this.initButtons();
        this.setupCanvas();
        this.setupAuroraCanvas();
    }
    GameAndAurora.prototype.initButtons = function () {
        var _this = this;
        var gameBtn = document.querySelector('[data-effect="game"]');
        var auroraBtn = document.querySelector('[data-effect="aurora"]');
        if (gameBtn) {
            gameBtn.addEventListener('click', function () { return _this.startGame(); });
        }
        if (auroraBtn) {
            auroraBtn.addEventListener('click', function () { return _this.startAurora(); });
        }
    };
    GameAndAurora.prototype.setupCanvas = function () {
        var _this = this;
        if (this.canvas) {
            var updateGameSize = function () {
                var containerWidth = _this.gameContainer ? _this.gameContainer.clientWidth : 500;
                _this.canvas.width = Math.min(containerWidth, 500);
                _this.canvas.height = 400;
            };
            
            updateGameSize();
            window.addEventListener('resize', updateGameSize);
            
            this.canvas.addEventListener('mousemove', function (e) {
                var rect = _this.canvas.getBoundingClientRect();
                _this.playerX = e.clientX - rect.left;
            });
            
            // Touch support for mobile
            this.canvas.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var rect = _this.canvas.getBoundingClientRect();
                var touch = e.touches[0];
                _this.playerX = touch.clientX - rect.left;
            }, { passive: false });
        }
    };
    GameAndAurora.prototype.setupAuroraCanvas = function () {
        var _this = this;
        if (this.auroraCanvas) {
            this.auroraCanvas.width = window.innerWidth;
            this.auroraCanvas.height = window.innerHeight;
            window.addEventListener('resize', function () {
                if (_this.auroraCanvas) {
                    _this.auroraCanvas.width = window.innerWidth;
                    _this.auroraCanvas.height = window.innerHeight;
                }
            });
        }
    };
    GameAndAurora.prototype.startGame = function () {
        var _this = this;
        if (this.gameActive)
            return;
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 30;
        this.gifts = [];
        if (this.gameContainer) {
            this.gameContainer.classList.add('active');
        }
        this.updateScore();
        this.updateTimer();
        var timerInterval = setInterval(function () {
            _this.timeLeft--;
            _this.updateTimer();
            if (_this.timeLeft <= 0) {
                clearInterval(timerInterval);
                _this.endGame();
            }
        }, 1000);
        this.gameLoop();
    };
    GameAndAurora.prototype.gameLoop = function () {
        var _this = this;
        if (!this.gameActive || !this.ctx || !this.canvas)
            return;
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
        for (var i = this.gifts.length - 1; i >= 0; i--) {
            var gift = this.gifts[i];
            gift.y += gift.speed;
            // Dibujar regalo
            this.ctx.font = '30px Arial';
            this.ctx.fillText(gift.emoji, gift.x, gift.y);
            // Detectar colisión con jugador
            var playerY = this.canvas.height - 50;
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
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    GameAndAurora.prototype.updateScore = function () {
        var scoreEl = document.getElementById('scoreValue');
        if (scoreEl)
            scoreEl.textContent = this.score.toString();
    };
    GameAndAurora.prototype.updateTimer = function () {
        var timerEl = document.getElementById('timerValue');
        if (timerEl)
            timerEl.textContent = this.timeLeft.toString();
    };
    GameAndAurora.prototype.endGame = function () {
        this.gameActive = false;
        if (this.ctx && this.canvas) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('¡Juego Terminado!', this.canvas.width / 2, this.canvas.height / 2 - 30);
            this.ctx.font = 'bold 24px Arial';
            this.ctx.fillText("Puntuaci\u00F3n: ".concat(this.score), this.canvas.width / 2, this.canvas.height / 2 + 10);
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Haz clic en el botón para jugar de nuevo', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    };
    GameAndAurora.prototype.startAurora = function () {
        if (this.auroraActive) {
            this.stopAurora();
            return;
        }
        this.auroraActive = true;
        if (this.auroraCanvas) {
            this.auroraCanvas.classList.add('active');
        }
        this.animateAurora();
    };
    GameAndAurora.prototype.animateAurora = function () {
        var _this = this;
        if (!this.auroraActive || !this.auroraCtx || !this.auroraCanvas)
            return;
        this.auroraCtx.clearRect(0, 0, this.auroraCanvas.width, this.auroraCanvas.height);
        var time = Date.now() * 0.001;
        for (var i = 0; i < 3; i++) {
            var gradient = this.auroraCtx.createLinearGradient(0, this.auroraCanvas.height * 0.2, 0, this.auroraCanvas.height * 0.8);
            var colors = [
                ['rgba(102, 126, 234, 0.3)', 'rgba(102, 126, 234, 0)'],
                ['rgba(118, 75, 162, 0.3)', 'rgba(118, 75, 162, 0)'],
                ['rgba(240, 147, 251, 0.3)', 'rgba(240, 147, 251, 0)']
            ];
            gradient.addColorStop(0, colors[i][0]);
            gradient.addColorStop(1, colors[i][1]);
            this.auroraCtx.fillStyle = gradient;
            this.auroraCtx.beginPath();
            for (var x = 0; x <= this.auroraCanvas.width; x += 10) {
                var y = this.auroraCanvas.height * 0.3 +
                    Math.sin(x * 0.01 + time + i) * 50 +
                    Math.sin(x * 0.02 + time * 1.5 + i) * 30;
                if (x === 0) {
                    this.auroraCtx.moveTo(x, y);
                }
                else {
                    this.auroraCtx.lineTo(x, y);
                }
            }
            this.auroraCtx.lineTo(this.auroraCanvas.width, this.auroraCanvas.height);
            this.auroraCtx.lineTo(0, this.auroraCanvas.height);
            this.auroraCtx.closePath();
            this.auroraCtx.fill();
        }
        if (this.auroraActive) {
            requestAnimationFrame(function () { return _this.animateAurora(); });
        }
    };
    GameAndAurora.prototype.stopAurora = function () {
        this.auroraActive = false;
        if (this.auroraCanvas) {
            this.auroraCanvas.classList.remove('active');
        }
    };
    return GameAndAurora;
}());
// 6. Mariposas Mágicas
var MagicButterflies = /** @class */ (function () {
    function MagicButterflies() {
        this.butterflies = [];
        this.container = document.querySelector('.butterflies-container');
        this.initButtons();
    }
    MagicButterflies.prototype.initButtons = function () {
        var _this = this;
        var butterfliesBtn = document.querySelector('[data-effect="butterflies"]');
        if (butterfliesBtn) {
            butterfliesBtn.addEventListener('click', function () { return _this.startButterflies(); });
        }
    };
    MagicButterflies.prototype.startButterflies = function () {
        var _this = this;
        for (var i = 0; i < 12; i++) {
            setTimeout(function () { return _this.createButterfly(); }, i * 500);
        }
    };
    MagicButterflies.prototype.createButterfly = function () {
        var _this = this;
        var butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        butterfly.textContent = '🦋';
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        butterfly.style.left = "".concat(x, "px");
        butterfly.style.top = "".concat(y, "px");
        this.container.appendChild(butterfly);
        var butterflyData = {
            element: butterfly,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        };
        this.butterflies.push(butterflyData);
        // Seguir el cursor
        var followCursor = function (e) {
            var dx = e.clientX - butterflyData.x;
            var dy = e.clientY - butterflyData.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
                butterflyData.vx += dx * 0.0001;
                butterflyData.vy += dy * 0.0001;
            }
        };
        document.addEventListener('mousemove', followCursor);
        var animate = function () {
            butterflyData.x += butterflyData.vx;
            butterflyData.y += butterflyData.vy;
            // Bordes
            if (butterflyData.x < 0 || butterflyData.x > window.innerWidth)
                butterflyData.vx *= -1;
            if (butterflyData.y < 0 || butterflyData.y > window.innerHeight)
                butterflyData.vy *= -1;
            // Límites
            butterflyData.x = Math.max(0, Math.min(window.innerWidth, butterflyData.x));
            butterflyData.y = Math.max(0, Math.min(window.innerHeight, butterflyData.y));
            butterfly.style.left = "".concat(butterflyData.x, "px");
            butterfly.style.top = "".concat(butterflyData.y, "px");
            if (document.body.contains(butterfly)) {
                requestAnimationFrame(animate);
            }
            else {
                document.removeEventListener('mousemove', followCursor);
            }
        };
        animate();
        setTimeout(function () {
            butterfly.remove();
            var index = _this.butterflies.indexOf(butterflyData);
            if (index > -1)
                _this.butterflies.splice(index, 1);
            document.removeEventListener('mousemove', followCursor);
        }, 15000);
    };
    return MagicButterflies;
}());
// Clase para manejar el sobre de inicio
var EnvelopeIntro = /** @class */ (function () {
    function EnvelopeIntro() {
        this.musicPlayer = null;
        this.envelopeScreen = document.getElementById('envelope-screen');
        this.envelope = document.getElementById('envelope');
        this.initEnvelope();
    }
    EnvelopeIntro.prototype.initEnvelope = function () {
        var _this = this;
        if (this.envelope) {
            this.envelope.addEventListener('click', function () {
                _this.openEnvelope();
            });
        }
    };
    EnvelopeIntro.prototype.setMusicPlayer = function (player) {
        this.musicPlayer = player;
    };
    EnvelopeIntro.prototype.openEnvelope = function () {
        var _this = this;
        // Abrir el sobre con animación
        this.envelope.classList.add('open');
        // Crear partículas de celebración
        this.createCelebrationParticles();
        // Esperar a que la animación del sobre termine
        setTimeout(function () {
            // Reproducir música
            if (_this.musicPlayer) {
                _this.musicPlayer.startMusic();
            }
            // Ocultar pantalla del sobre
            setTimeout(function () {
                _this.envelopeScreen.classList.add('hidden');
                // Remover completamente después de la transición
                setTimeout(function () {
                    _this.envelopeScreen.remove();
                }, 1000);
            }, 1500);
        }, 1000);
    };
    EnvelopeIntro.prototype.createCelebrationParticles = function () {
        var emojis = ['🎉', '🎊', '✨', '🎈', '🎁', '💖', '🌟', '💫', '🦋', '🌸'];
        for (var i = 0; i < 30; i++) {
            setTimeout(function () {
                var particle = document.createElement('div');
                particle.classList.add('celebration-particle');
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                particle.style.left = "".concat(Math.random() * 100, "%");
                particle.style.top = '50%';
                particle.style.animationDelay = "".concat(Math.random() * 0.5, "s");
                document.body.appendChild(particle);
                setTimeout(function () { return particle.remove(); }, 2000);
            }, i * 50);
        }
    };
    return EnvelopeIntro;
}());
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el sobre primero
    var envelopeIntro = new EnvelopeIntro();
    // Inicializar el reproductor de música
    var musicPlayer = new MusicPlayer();
    // Conectar el sobre con el reproductor de música
    envelopeIntro.setMusicPlayer(musicPlayer);
    var pathReveal = new PathReveal();
    var celebration = new BirthdayCelebration();
    var cardInteractions = new CardInteractions();
    var fireworks = new FireworksShow();
    // Nuevos efectos
    var starsAndPinata = new StarsAndPinata();
    var heartsAndSurprise = new HeartsAndSurprise();
    var petalsAndRoulette = new PetalsAndRoulette();
    var balloonsAndPiano = new BalloonsAndPiano();
    var gameAndAurora = new GameAndAurora();
    var butterflies = new MagicButterflies();
    console.log('🎉 ¡Página de cumpleaños cargada exitosamente!');
    console.log('💌 ¡Abre el sobre para comenzar!');
    console.log('🎵 Música lista para reproducir');
    console.log('✨ ¡Todos los efectos están listos!');
});

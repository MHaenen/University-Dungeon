// 3D World Simulation using Three.js
let scene, camera, renderer, player;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let canJump = true, velocityY = 0;
const gravity = -0.015;
const jumpForce = 0.3;

// Organic Movement Constants
let velocityX = 0, velocityZ = 0;
const acceleration = 0.02;
const friction = 0.85;
const maxSpeed = 0.15;

const obstacles = [];

// Pointer lock and rotation variables
let isLocked = false;
const mouseSensitivity = 0.002;
let pitch = 0;
let yaw = 0;

window.initWorld = function (characterData) {
    console.log("Initializing 3D World for:", characterData.name);

    // Setup Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // Setup Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('canvas-container');
    if (container) {
        container.appendChild(renderer.domElement);
        container.addEventListener('click', () => {
            if (!isLocked) {
                container.requestPointerLock = container.requestPointerLock || container.mozRequestPointerLock;
                container.requestPointerLock();
            }
        });
    } else {
        document.body.appendChild(renderer.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 15, 7.5);
    scene.add(directionalLight);

    // Grid Plane
    const gridSize = 60;
    const geometry = new THREE.PlaneGeometry(1, 1);
    for (let i = -gridSize / 2; i < gridSize / 2; i++) {
        for (let j = -gridSize / 2; j < gridSize / 2; j++) {
            const material = new THREE.MeshPhongMaterial({
                color: (Math.abs(i + j)) % 2 === 0 ? 0x222222 : 0x333333,
                side: THREE.DoubleSide
            });
            const panel = new THREE.Mesh(geometry, material);
            panel.rotation.x = -Math.PI / 2;
            panel.position.set(i + 0.5, 0, j + 0.5);
            scene.add(panel);
        }
    }

    // Obstacles
    createObstacles();

    // Player Box (0.8m)
    const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: characterData.uniformColor || 0x4A90E2 });
    player = new THREE.Mesh(boxGeometry, boxMaterial);
    player.position.y = 0.4;
    scene.add(player);

    // Player Collision Box (Visible)
    const playerHelper = new THREE.BoxHelper(player, 0x00ff00);
    scene.add(playerHelper);
    player.helper = playerHelper;

    // Controls
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('pointerlockchange', lockChangeAlert, false);

    animate();
};

function lockChangeAlert() {
    const container = document.getElementById('canvas-container');
    if (document.pointerLockElement === container) {
        isLocked = true;
    } else {
        isLocked = false;
    }
}

function createObstacles() {
    const obstacleCount = 40;
    const boxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cylinderGeo = new THREE.CylinderGeometry(0.6, 0.6, 2, 16);

    for (let i = 0; i < obstacleCount; i++) {
        const isCylinder = Math.random() > 0.5;
        const geo = isCylinder ? cylinderGeo : boxGeo;
        const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.5);
        const mat = new THREE.MeshPhongMaterial({ color: color });
        const mesh = new THREE.Mesh(geo, mat);

        let x, z;
        do {
            x = (Math.random() - 0.5) * 40;
            z = (Math.random() - 0.5) * 40;
        } while (Math.sqrt(x * x + z * z) < 5);

        mesh.position.set(x, isCylinder ? 1 : 0.75, z);

        // Add dynamic properties
        mesh.userData = {
            initialY: mesh.position.y,
            speed: 0.02 + Math.random() * 0.05,
            offset: Math.random() * Math.PI * 2,
            type: Math.random() > 0.7 ? 'moving' : 'static',
            height: isCylinder ? 2 : 1.5
        };

        scene.add(mesh);
        obstacles.push(mesh);

        const helper = new THREE.BoxHelper(mesh, 0xff0000);
        scene.add(helper);
        mesh.helper = helper;
    }
}

function onMouseMove(event) {
    if (!isLocked) return;
    const movementX = event.movementX || event.mozMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || 0;

    // Fix inversion: Yaw -= X, Pitch += Y (standard FPS)
    yaw -= movementX * mouseSensitivity;
    pitch += movementY * mouseSensitivity;

    pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch));
}

function onKeyDown(event) {
    if (event.repeat) return;
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyD': moveRight = true; break;
        case 'KeyR': window.respawnPlayer(); break;
        case 'Space':
            if (canJump) {
                velocityY = jumpForce;
                canJump = false;
            }
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyD': moveRight = false; break;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.respawnPlayer = function () {
    player.position.set(0, 0.4, 0);
    velocityX = 0;
    velocityZ = 0;
    velocityY = 0;
    canJump = true;
    yaw = 0;
    pitch = 0;
    console.log("Player respawned!");
};

function checkCollision(posX, posY, posZ) {
    const playerRadius = 0.4;
    const playerBottom = posY - 0.4;
    const playerTop = posY + 0.4;

    let onObject = null;

    for (const obs of obstacles) {
        const obsX = obs.position.x;
        const obsY = obs.position.y;
        const obsZ = obs.position.z;
        const obsSize = obs.geometry.type === 'BoxGeometry' ? 1.5 : 1.2;
        const obsHeight = obs.userData.height;
        const obsTop = obsY + obsHeight / 2;
        const obsBottom = obsY - obsHeight / 2;

        const dx = Math.abs(posX - obsX);
        const dz = Math.abs(posZ - obsZ);

        if (dx < (playerRadius + obsSize / 2) && dz < (playerRadius + obsSize / 2)) {
            if (playerTop > obsBottom && playerBottom < obsTop) {
                if (velocityY < 0 && playerBottom >= obsTop - 0.2) {
                    onObject = obsTop;
                } else {
                    return { collision: true };
                }
            }
        }
    }
    return { collision: false, onObject: onObject };
}

function animate(time) {
    requestAnimationFrame(animate);

    // Update Dynamic Obstacles
    obstacles.forEach(obs => {
        if (obs.userData.type === 'moving') {
            obs.position.y = obs.userData.initialY + Math.sin(time * 0.001 * obs.userData.speed + obs.userData.offset) * 2;
            if (obs.helper) obs.helper.update();
        } else {
            obs.rotation.y += 0.01;
            if (obs.helper) obs.helper.update();
        }
    });

    // Rotation
    player.rotation.y = yaw;

    // Organic Movement (Acceleration & Damping)
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

    if (moveForward) {
        velocityX += forward.x * acceleration;
        velocityZ += forward.z * acceleration;
    }
    if (moveBackward) {
        velocityX -= forward.x * acceleration;
        velocityZ -= forward.z * acceleration;
    }
    if (moveLeft) {
        velocityX -= right.x * acceleration;
        velocityZ -= right.z * acceleration;
    }
    if (moveRight) {
        velocityX += right.x * acceleration;
        velocityZ += right.z * acceleration;
    }

    // Apply Friction
    velocityX *= friction;
    velocityZ *= friction;

    // Clamp Speed
    const speed = Math.sqrt(velocityX * velocityX + velocityZ * velocityZ);
    if (speed > maxSpeed) {
        const ratio = maxSpeed / speed;
        velocityX *= ratio;
        velocityZ *= ratio;
    }

    // Vertical Movement
    velocityY += gravity;
    let nextY = player.position.y + velocityY;

    // Horizontal Collision Check
    let nextX = player.position.x + velocityX;
    let nextZ = player.position.z + velocityZ;

    const collisionResult = checkCollision(nextX, nextY, nextZ);

    if (!collisionResult.collision) {
        player.position.x = nextX;
        player.position.z = nextZ;
    } else {
        // Axis-independent collision resolution
        if (!checkCollision(nextX, player.position.y, player.position.z).collision) {
            player.position.x = nextX;
        } else {
            velocityX = 0;
        }
        if (!checkCollision(player.position.x, player.position.y, nextZ).collision) {
            player.position.z = nextZ;
        } else {
            velocityZ = 0;
        }
    }

    // Ground/Platform check
    if (collisionResult.onObject !== null) {
        player.position.y = collisionResult.onObject + 0.4;
        velocityY = 0;
        canJump = true;
    } else if (nextY <= 0.4) {
        player.position.y = 0.4;
        velocityY = 0;
        canJump = true;
    } else {
        player.position.y = nextY;
    }

    // Update Helper
    if (player.helper) player.helper.update();

    // Auto-Respawn
    if (player.position.y < -15) respawnPlayer();

    // Camera follow
    const cameraOffset = new THREE.Vector3(0, 5, 10);
    cameraOffset.applyEuler(new THREE.Euler(pitch, yaw, 0));
    camera.position.copy(player.position).add(cameraOffset);
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

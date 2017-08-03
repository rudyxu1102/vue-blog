<template>
    <canvas id="particle"></canvas>
</template>

<script>
export default {
    mounted () {
        const canvas = document.getElementById('particle')
        const ctx = canvas.getContext('2d')
        const cw = window.innerWidth
        const ch = window.innerHeight
        canvas.width = cw
        canvas.height = ch

        let particleArr = []             // 放置放光点的数组
        let active = true
        let startColor = [154, 235, 21, 224]
        let endColor = [176, 179, 20, 53]
        let colorRandom = [47, 47, 42, 0]

        const maxParticle = 216
        const size = 48                     // 发光点的大小
        const sizeRandom = 64               // 发光点的随机增量
        const sharpness = 0                 // 发光点内部放射圆的百分比
        const sharpnessRandom = 11
        const speed = 11
        const speedRandom = 1.5
        const angle = 180
        const xRandom = 80                  // 发光点位置的随机增量
        const yRandom = 50
        const timesUpdate = 23              // 发光点增加到指定颜色的次数
        const timesUpdateRandom = 7
        const gravityY = -0.5
        const emitNums = 3                 // 控制一次产生发光点的个数

        let timer

//        let mouseX = cw * 3 / 5
//        let mouseY = ch * 2 / 3

        let mouseX
        let mouseY = 4 * ch / 5
        const mxMove = () => {
            if (mouseX < 9 * cw / 10) {
                mouseX = mouseX + 20
                timer = setTimeout(mxMove, 10)
            } else {
                mouseX = cw / 3
                timer = setTimeout(mxMove, 10)
            }
        }
        mxMove()

        function random (min, max) {
            return Math.random() * (max - min) + min
        }

        // 每个发光点的信息
        function Particle (mx, my) {
            this.size = size + sizeRandom * random(-1, 1)
            this.size = this.size < 0 ? 0 : this.size
            this.sharpness = sharpness + sharpnessRandom * random(-1, 1)
            this.sharpness = this.sharpness < 0 ? 0 : this.sharpness
            this.sizeSmall = (this.size / 2) * (this.sharpness / 100)
            this.speed = speed + speedRandom * random(-1, 1)
            this.positionX = mx - 80 + xRandom * random(-1, 1)
            this.positionY = my - 80 + yRandom * random(-1, 1)
            this.directionX = this.speed * Math.cos(angle)
            this.directionY = this.speed * Math.sin(angle)
            this.timesUpdate = timesUpdate + timesUpdateRandom * random(-1, 1)
            const start = [
                startColor[0] + colorRandom[0] * random(-1, 1),
                startColor[1] + colorRandom[1] * random(-1, 1),
                startColor[2] + colorRandom[2] * random(-1, 1),
                startColor[3] + colorRandom[3] * random(-1, 1)
            ]
            const end = [
                endColor[0] + colorRandom[0] * random(-1, 1),
                endColor[1] + colorRandom[1] * random(-1, 1),
                endColor[2] + colorRandom[2] * random(-1, 1),
                endColor[3] + colorRandom[3] * random(-1, 1)
            ]
            this.color = start
            this.deltaColor = [
                (end[0] - start[0]) / this.timesUpdate,
                (end[1] - start[1]) / this.timesUpdate,
                (end[2] - start[2]) / this.timesUpdate,
                (end[3] - start[3]) / this.timesUpdate
            ]
            this.drawColor = ''
        }

        // 更新颜色，将startColor增加到endColor
        function update () {
            const rate = 1 / emitNums
            let n = 1
            while (particleArr.length < maxParticle && n > rate) {
                if (active) {
                    particleArr.push(new Particle(mouseX, mouseY))
                    n -= rate
                } else {
                    break
                }
            }
            let particleIndex = 0
            while (particleIndex < particleArr.length - 1) {
                const current = particleArr[particleIndex]
                if (current.timesUpdate > 0) {
                    current.directionY += gravityY
                    current.positionX += current.directionX
                    current.positionY += current.directionY
                    current.timesUpdate--
                    current.color[0] += current.deltaColor[0]
                    current.color[1] += current.deltaColor[1]
                    current.color[2] += current.deltaColor[2]
                    current.color[3] += current.deltaColor[3]
                    let newcolor = []
                    newcolor[0] = current.color[0] > 255 ? 255 : current.color[0] < 0 ? 0 : current.color[0].toFixed(0)
                    newcolor[1] = current.color[1] > 255 ? 255 : current.color[1] < 0 ? 0 : current.color[1].toFixed(0)
                    newcolor[2] = current.color[2] > 255 ? 255 : current.color[2] < 0 ? 0 : current.color[2].toFixed(0)
                    newcolor[3] = current.color[3] > 1 ? 1 : current.color[3] < 0 ? 0 : current.color[3].toFixed(2)
                    current.drawColor = 'rgba(' + newcolor.join(',') + ')'
                    particleIndex++
                } else {
                    particleArr.splice(particleIndex, 1)
                }
            }
        }

        // 将particleArr数组画出来
        function draw () {
            for (let i = 0; i < particleArr.length - 1; i++) {
                const particle = particleArr[i]
                const size = particle.size
                const halfSize = size / 2
                const x = particle.positionX
                const y = particle.positionY
                const radgard = ctx.createRadialGradient(x + halfSize, y + halfSize, particle.sizeSmall, x + halfSize, y + halfSize, halfSize)
                radgard.addColorStop(0, particle.drawColor)
                radgard.addColorStop(1, 'rgba(0,0,0,0)')
                ctx.fillStyle = radgard
                ctx.fillRect(x, y, size, size)
                ctx.globalCompositeOperation = 'lighter'
            }
        }

        // 开始动画循环
        function loop () {
            update()
            ctx.clearRect(0, 0, cw, ch)
            draw()
            setTimeout(loop, 80)
        }

        window.addEventListener('mousemove', function (e) {
            clearTimeout(timer)
            mouseX = e.clientX - canvas.offsetLeft
            mouseY = e.clientY - canvas.offsetTop
        })

        window.addEventListener('click', function () {
            active = !active
            startColor = []
            endColor = []
            for (let i = 0; i < 4; i++) {
                startColor.push(random(0, 255))
                endColor.push(random(0, 255))
            }
//            获取喜欢的颜色，设置在起始数据
//            console.log('startColor: ' + startColor)
//            console.log('endColor: ' + endColor)
//            console.log('colorRandom: ' + colorRandom)
        })
        window.addEventListener('mouseout', function () {
            const mxMove = () => {
                if (mouseX < 9 * cw / 10) {
                    mouseX = mouseX + 20
                    timer = setTimeout(mxMove, 10)
                } else {
                    mouseX = cw / 3
                    timer = setTimeout(mxMove, 10)
                }
            }
            mouseY = 4 * ch / 5
            mxMove()
        })
        window.onload = loop()
    }
}
</script>

<style scoped>
    #particle {
        position: fixed;
        background: #000;
        z-index: -1;
    }
</style>

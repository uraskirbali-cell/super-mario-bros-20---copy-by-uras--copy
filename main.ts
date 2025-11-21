enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Ow!", invincibilityPeriod)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        333333333333333333333333
        3dddddddddddddddddddddd3
        3d33333333333333333333d3
        333333333333333333333333
        b3bddb333333333333bddb3b
        b3b33b333333333333b33b3b
        b3bbbb333333333333bbbb3b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3333333333333333333333b
        b3bddb333333333333bddb3b
        b3b33b333333333333b33b3b
        b3bbbb333333333333bbbb3b
        bb33333333333333333333bb
        bbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbb
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f 2 . . . . . . 
        . . . . f 2 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . 2 5 5 5 4 4 5 5 5 2 . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . 2 5 5 5 4 4 5 5 5 2 . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 2 f . . . . 
        . . . . . . 2 f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Move with the left and right buttons")
    showInstruction("Jump with the up or A button")
    showInstruction("Double jump by pressing jump again")
    showInstruction("And dont forget to beat 32 levels")
    showInstruction("HAVE FUN !!!")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Walking, 1)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 2 . 
        . . . . . . d d d d . . . . . . 
        . . . . . . d d d d d . . . . . 
        . . . . . . d d d d d . . . . . 
        . . . . . . d d d d d . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 . . 
        . . . . . . d d d d . . . . . . 
        . . . . . d d d d d . . . . . . 
        . . . . . d d d d d . . . . . . 
        . . . . . d d d d d . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 . . 
        . . . . . . d d d d . . . . . . 
        . . . d d d d d d d . . . . . . 
        . . . d d d d d d d . . . . . . 
        . . . d d d d d d d . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 . . 
        . . . . . . d d d d . . . . . . 
        . d d d d d d d d d . . . . . . 
        . d d d d d d d d d . . . . . . 
        . d d d d d d d d d . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 . . 
        . . . . . . d d d d . . . . . . 
        . . . . . . d d d d d . . . . . 
        . . . . . . d d d d d . . . . . 
        . . . . . . d d d d d . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 . . 
        . . . . . . d d d d . . . . . . 
        . . . . . . d d d d d d d . . . 
        . . . . . . d d d d d d d . . . 
        . . . . . . d d d d d d d . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 1 1 2 2 2 2 . . . . . 
        . . . . 2 1 1 2 2 1 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 1 2 2 2 2 2 2 . . 
        . . . . . . d d d d . . . . . . 
        . . . . . . d d d d d d d d d d 
        . . . . . . d d d d d d d d d d 
        . . . . . . d d d d d d d d d d 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(10)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -5.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Walking, 100)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . 1 1 1 1 . . . . . 1 1 1 1 . . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . e e . 1 1 1 1 1 . 
        . 1 1 1 1 1 e e e e 1 1 1 1 . . 
        . . . . . e e e e e e . . . . . 
        . . . . e f 1 e e f 1 e . . . . 
        . . . e e 1 1 e e 1 1 e e . . . 
        . . e e e e e e e e e e e e . . 
        . e e e e e e e e e e e e e e . 
        . . . . . d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . f f d d d d d d f f . . . 
        . . . f f . . . . . . f f . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . 1 1 1 1 . . . . . 1 1 1 1 . . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . e e . 1 1 1 1 1 . 
        . 1 1 1 1 1 e e e e 1 1 1 1 . . 
        . . . . . e e e e e e . . . . . 
        . . . . e f 1 e e f 1 e . . . . 
        . . . e e 1 1 e e 1 1 e e . . . 
        . . e e e e e e e e e e e e . . 
        . e e e e e e e e e e e e e e . 
        . . . . . d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . f f d d d d d d f f . . . 
        . . . f f . . . . . . f f . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . 1 1 1 1 . . . . . 1 1 1 1 . . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . e e . 1 1 1 1 1 . 
        . 1 1 1 1 1 e e e e 1 1 1 1 . . 
        . . . . . e e e e e e . . . . . 
        . . . . e f 1 e e f 1 e . . . . 
        . . . e e 1 1 e e 1 1 e e . . . 
        . . e e e e e e e e e e e e . . 
        . e e e e e e e e e e e e e e . 
        . . . . . d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . f f d d d d d d f f . . . 
        . . . f f . . . . . . f f . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Walking, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . 1 1 1 1 . . . . . 1 1 1 1 . . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . e e . 1 1 1 1 1 . 
        . 1 1 1 1 1 e e e e 1 1 1 1 . . 
        . . . . . e e e e e e . . . . . 
        . . . . e f 1 e e f 1 e . . . . 
        . . . e e 1 1 e e 1 1 e e . . . 
        . . e e e e e e e e e e e e . . 
        . e e e e e e e e e e e e e e . 
        . . . . . d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . . d d d d d d d d . . . . 
        . . . f f d d d d d d f f . . . 
        . . . f f . . . . . . f f . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . e e e e d f d . . . . . . 
            . . e d e d d d f d d d . . . . 
            . . e d e e d d d e d d d . . . 
            . . e e d d d d e e e e . . . . 
            . . . . d d d d d d d . . . . . 
            . . . 8 8 2 8 8 8 . . . . . . . 
            . . 8 8 8 2 8 8 2 8 8 8 . . . . 
            . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
            . d d 8 2 5 2 2 5 2 8 d d . . . 
            . d d d 2 2 2 2 2 2 d d d . . . 
            . d d 2 2 2 2 2 2 2 2 d d . . . 
            . . . 2 2 2 . . 2 2 2 . . . . . 
            . . e e e . . . . e e e . . . . 
            . e e e e . . . . e e e e . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . . e e e e d f d . . . . . . 
        . . e d e d d d f d d d . . . . 
        . . e d e e d d d e d d d . . . 
        . . e e d d d d e e e e . . . . 
        . . . . d d d d d d d . . . . . 
        . . . 8 8 2 8 8 8 . . . . . . . 
        . . 8 8 8 2 8 8 2 8 8 8 . . . . 
        . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
        . d d 8 2 5 2 2 5 2 8 d d . . . 
        . d d d 2 2 2 2 2 2 d d d . . . 
        . d d 2 2 2 2 2 2 2 2 d d . . . 
        . . . 2 2 2 . . 2 2 2 . . . . . 
        . . e e e . . . . e e e . . . . 
        . e e e e . . . . e e e e . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . e e e e d f d . . . . . . 
            . . e d e d d d f d d d . . . . 
            . . e d e e d d d e d d d . . . 
            . . e e d d d d e e e e . . . . 
            . . . . d d d d d d d . . . . . 
            . . . 8 8 2 8 8 8 . . . . . . . 
            . . 8 8 8 2 8 8 2 8 8 8 . . . . 
            . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
            . d d 8 2 5 2 2 5 2 8 d d . . . 
            . d d d 2 2 2 2 2 2 d d d . . . 
            . d d 2 2 2 2 2 2 2 2 d d . . . 
            . . . 2 2 2 . . 2 2 2 . . . . . 
            . . e e e . . . . e e e . . . . 
            . e e e e . . . . e e e e . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d c c c c c c c c c d d f . 
        f d d f f f b b f f f f d d f . 
        . f f a a a a a a a a a b f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . f d d c c c c c c c c c d f . 
        . f d d f f f f b b f f f d d f 
        . . f b a a a a a a a a a f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
info.onCountdownEnd(function () {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    info.changeLifeBy(0)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level ")
        setLevelTileMap(currentLevel)
    } else {
        game.splash("Call us for your reaward [0554417916]")
        game.over(true, effects.smiles)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . . . . e e . . . . . . . 
            . . . . . . e e e e . . . . . . 
            . . . . . e e e e e e . . . . . 
            . . . . e 1 1 e e 1 1 e . . . . 
            . . . e e f 1 e e 1 f e e . . . 
            . . e e e e e e e e e e e e . . 
            . e e e e e e e e e e e e e e . 
            . . . . . d d d d d d . . . . . 
            . . . . . d d d d d d . . . . . 
            . . . . d d d d d d d d . . . . 
            . . . . d d d d d d d d . . . . 
            . . . f f f . . . . f f f . . . 
            . . . f f f . . . . f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Walking)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
music.play(music.createSong(hex`0078000408010201001c000f05001202c102c201000405002800000064002800031400060200042d0008000c00020f250c001000011410001400030c222914001800030f202418001c0001141c00200005080d11272a06001c00010a006400f40164000004000000000000000000000000000000000209000c001000040c112229`), music.PlaybackMode.UntilDone)
hero = sprites.create(img`
    . . . . 2 2 2 2 2 2 . . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 . . . . 
    . . . e e e e d f d . . . . . . 
    . . e d e d d d f d d d . . . . 
    . . e d e e d d d e d d d . . . 
    . . e e d d d d e e e e . . . . 
    . . . . d d d d d d d . . . . . 
    . . . 8 8 2 8 8 8 . . . . . . . 
    . . 8 8 8 2 8 8 2 8 8 8 . . . . 
    . 8 8 8 8 2 2 2 2 8 8 8 8 . . . 
    . d d 8 2 5 2 2 5 2 8 d d . . . 
    . d d d 2 2 2 2 2 2 d d d . . . 
    . d d 2 2 2 2 2 2 2 2 d d . . . 
    . . . 2 2 2 . . 2 2 2 . . . . . 
    . . e e e . . . . e e e . . . . 
    . e e e e . . . . e e e e . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 11.1 * pixelsToMeters
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999111119999999999999999999999999999999999999999999199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999111111199999999999999999999999999999999999999999111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999991111111111119999999999999999999999999999999999911111111111111999111111999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999991111111111111199999999999999999999999999999999111111111111111111111111111111119999999999999999999999999999999999999999999999999999999999999999
    9999999999999999911111111111111111999999999999999999999999999911111111111111111111111111111111991119999999999999999999999999999999999999999999999999999999999999
    9999999999999999911111111111111111119999999999999999999999999111111111111111111111111111111111119991111119999999999999999999999999999999999999999999999999999999
    9999999999999999911111111111111111111199999999999999999999999111111111111111111111111111111111111111199991111199999999999999999999999999999999999999999999999999
    9999999999999999111111111111111111111119999999999999999999999111111111111111111111111111111111111111111111199911111199999999999999999999999999999999999999999999
    9999999999999999111111111111111111111119999999999999999999911111111111111111111111111111111111111111111111111119999999999999999999999999999999999999999999999999
    9999999999999999111111111111111111111119999999999999999999111111111111111111111111111111111111111111111111111111111199999999999999999999999999999999999999999999
    9999999999999999111111111111111111111111999999999999999999111111111111111111111111111111111111111111111111111111111119999999999999999999999999999999999999999999
    9999999999999999111111111111111111111111999999999999999999111111111111111111111111111111111111111111111111111111111119999999999999999999999999999999999999999999
    9999999999999999111111111111111111111111999999999999999999111111111111111111111111111111111111111111111111111111111199999999999999999999999999999999999999999999
    9999999999999999111111111111111111111111999999999999999999111111111111111111111111111111111111111111111111111111111999999999999999999999999999999999999999999999
    9999999999999999911111111111111111111111999999999999999999999991111111111111111111111111111111111111111111111111999999999999999999999999999999999999999999999999
    9999999999999999911111111111111111111111999999999999999999999999991111111111111111111111111111111111111111119999999999999999999999999999999999999999999999999999
    9999999999999999991111111111111111111111999999999999999999999999999999111111111111111111111111111111111199999999999999999999999999999999999999999999999999999999
    9999999999999999999111111111111111111119999999999999999999999999999999999999991111111111111111199999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999991111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999911111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999991111111199999999999999999999999999999999999999999999999999999999999999999999999999999999111999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111119999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111119111111999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111119999999199999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111119999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111111111111119999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111111999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111111999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111119999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111199999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111119999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111119999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111119999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111199999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111119999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998999899989998999899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989998999899989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999999999999999999999999999
    8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    `)
initializeAnimations()
createPlayer(hero)
levelCount = 12
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
info.startCountdown(90)
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.Walking)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.Walking)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Walking)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Walking)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})

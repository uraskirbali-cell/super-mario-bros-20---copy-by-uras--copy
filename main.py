class ActionKind(Enum):
    RunningLeft = 0
    RunningRight = 1
    Idle = 2
    IdleLeft = 3
    IdleRight = 4
    JumpingLeft = 5
    JumpingRight = 6
    CrouchLeft = 7
    CrouchRight = 8
    Flying = 9
    Walking = 10
    Jumping = 11
@namespace
class SpriteKind:
    Bumper = SpriteKind.create()
    Goal = SpriteKind.create()
    Coin = SpriteKind.create()
    Flier = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    if sprite.vy > 0 and not (sprite.is_hitting_tile(CollisionDirection.BOTTOM)) or sprite.y < otherSprite.top:
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.change_score_by(1)
        music.power_up.play()
    else:
        info.change_life_by(-1)
        sprite.say("Ow!", invincibilityPeriod)
        music.power_down.play()
    pause(invincibilityPeriod)
sprites.on_overlap(SpriteKind.player, SpriteKind.Bumper, on_on_overlap)

def initializeAnimations():
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
def giveIntroduction():
    game.set_dialog_frame(img("""
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
        """))
    game.set_dialog_cursor(img("""
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
        """))
    showInstruction("Move with the left and right buttons")
    showInstruction("Jump with the up or A button")
    showInstruction("Double jump by pressing jump again")
    showInstruction("And dont forget to beat 32 levels")
    showInstruction("HAVE FUN !!!")

def on_up_pressed():
    attemptJump()
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def initializeCoinAnimation():
    global coinAnimation
    coinAnimation = animation.create_animation(ActionKind.Walking, 1)
    coinAnimation.add_animation_frame(img("""
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
        """))
    coinAnimation.add_animation_frame(img("""
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
        """))
    coinAnimation.add_animation_frame(img("""
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
        """))
    coinAnimation.add_animation_frame(img("""
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
        """))
    coinAnimation.add_animation_frame(img("""
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
        """))
    coinAnimation.add_animation_frame(img("""
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
        """))
    coinAnimation.add_animation_frame(img("""
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
        """))

def on_on_overlap2(sprite2, otherSprite2):
    otherSprite2.destroy(effects.trail, 250)
    otherSprite2.y += -3
    info.change_score_by(10)
    music.ba_ding.play()
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, on_on_overlap2)

def attemptJump():
    global doubleJumpSpeed, canDoubleJump
    # else if: either fell off a ledge, or double jumping
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        hero.vy = -4 * pixelsToMeters
    elif canDoubleJump:
        doubleJumpSpeed = -3 * pixelsToMeters
        # Good double jump
        if hero.vy >= -40:
            doubleJumpSpeed = -5.5 * pixelsToMeters
            hero.start_effect(effects.trail, 500)
            scene.camera_shake(2, 250)
        hero.vy = doubleJumpSpeed
        canDoubleJump = False
def animateIdle():
    global mainIdleLeft, mainIdleRight
    mainIdleLeft = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainIdleLeft)
    mainIdleLeft.add_animation_frame(img("""
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
        """))
    mainIdleRight = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainIdleRight)
    mainIdleRight.add_animation_frame(img("""
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
        """))
def setLevelTileMap(level: number):
    clearGame()
    if level == 0:
        tiles.set_tilemap(tilemap("""
            level
            """))
    elif level == 1:
        tiles.set_tilemap(tilemap("""
            level_0
            """))
    elif level == 2:
        tiles.set_tilemap(tilemap("""
            level_1
            """))
    elif level == 3:
        tiles.set_tilemap(tilemap("""
            level_2
            """))
    elif level == 4:
        tiles.set_tilemap(tilemap("""
            level_3
            """))
    elif level == 5:
        tiles.set_tilemap(tilemap("""
            level_4
            """))
    elif level == 6:
        tiles.set_tilemap(tilemap("""
            level_5
            """))
    elif level == 7:
        tiles.set_tilemap(tilemap("""
            level_6
            """))
    initializeLevel(level)
def initializeFlierAnimations():
    global flierFlying, flierIdle
    flierFlying = animation.create_animation(ActionKind.Walking, 100)
    flierFlying.add_animation_frame(img("""
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
        """))
    flierFlying.add_animation_frame(img("""
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
        """))
    flierFlying.add_animation_frame(img("""
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
        """))
    flierIdle = animation.create_animation(ActionKind.Walking, 100)
    flierIdle.add_animation_frame(img("""
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
        """))

def on_a_pressed():
    attemptJump()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def animateRun():
    global mainRunLeft, mainRunRight
    mainRunLeft = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainRunLeft)
    mainRunLeft.add_animation_frame(img("""
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
        """))
    mainRunLeft.add_animation_frame(img("""
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
        """))
    mainRunLeft.add_animation_frame(img("""
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
        """))
    mainRunLeft.add_animation_frame(img("""
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
        """))
    mainRunRight = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainRunRight)
    mainRunRight.add_animation_frame(img("""
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
        """))
    mainRunRight.add_animation_frame(img("""
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
        """))
    mainRunRight.add_animation_frame(img("""
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
        """))
    mainRunRight.add_animation_frame(img("""
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
        """))
def animateJumps():
    global mainJumpLeft, mainJumpRight
    # Because there isn't currently an easy way to say "play this animation a single time
    # and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    # the same behavior
    mainJumpLeft = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainJumpLeft)
    mainJumpLeft.add_animation_frame(img("""
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
        """))
    mainJumpLeft.add_animation_frame(img("""
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
        """))
    for index in range(30):
        mainJumpLeft.add_animation_frame(img("""
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
            """))
    mainJumpRight = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainJumpRight)
    mainJumpRight.add_animation_frame(img("""
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
        """))
    mainJumpRight.add_animation_frame(img("""
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
        """))
    for index2 in range(30):
        mainJumpRight.add_animation_frame(img("""
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
            """))
def animateCrouch():
    global mainCrouchLeft, mainCrouchRight
    mainCrouchLeft = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainCrouchLeft)
    mainCrouchLeft.add_animation_frame(img("""
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
        """))
    mainCrouchRight = animation.create_animation(ActionKind.Walking, 100)
    animation.attach_animation(hero, mainCrouchRight)
    mainCrouchRight.add_animation_frame(img("""
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
        """))
def clearGame():
    for value in sprites.all_of_kind(SpriteKind.Bumper):
        value.destroy()
    for value2 in sprites.all_of_kind(SpriteKind.Coin):
        value2.destroy()
    for value3 in sprites.all_of_kind(SpriteKind.Goal):
        value3.destroy()
    for value4 in sprites.all_of_kind(SpriteKind.Flier):
        value4.destroy()

def on_countdown_end():
    game.game_over(False)
info.on_countdown_end(on_countdown_end)

def on_overlap_tile(sprite3, location):
    global currentLevel
    info.change_life_by(0)
    currentLevel += 1
    if hasNextLevel():
        game.splash("Next level ")
        setLevelTileMap(currentLevel)
    else:
        game.splash("Call us for your reaward [0554417916]")
        game.over(True, effects.smiles)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile1
        """),
    on_overlap_tile)

def on_on_overlap3(sprite4, otherSprite3):
    info.change_life_by(-1)
    sprite4.say("Ow!", invincibilityPeriod * 1.5)
    music.power_down.play()
    pause(invincibilityPeriod * 1.5)
sprites.on_overlap(SpriteKind.player, SpriteKind.Flier, on_on_overlap3)

def createEnemies():
    global bumper, flier
    # enemy that moves back and forth
    for value5 in tiles.get_tiles_by_type(assets.tile("""
        tile4
        """)):
        bumper = sprites.create(img("""
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
                """),
            SpriteKind.Bumper)
        tiles.place_on_tile(bumper, value5)
        tiles.set_tile_at(value5, assets.tile("""
            tile0
            """))
        bumper.ay = gravity
        if Math.percent_chance(50):
            bumper.vx = Math.random_range(30, 60)
        else:
            bumper.vx = Math.random_range(-60, -30)
    # enemy that flies at player
    for value6 in tiles.get_tiles_by_type(assets.tile("""
        tile7
        """)):
        flier = sprites.create(img("""
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
                """),
            SpriteKind.Flier)
        tiles.place_on_tile(flier, value6)
        tiles.set_tile_at(value6, assets.tile("""
            tile0
            """))
        animation.attach_animation(flier, flierFlying)
        animation.attach_animation(flier, flierIdle)

def on_down_pressed():
    if not (hero.is_hitting_tile(CollisionDirection.BOTTOM)):
        hero.vy += 80
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def showInstruction(text: str):
    game.show_long_text(text, DialogLayout.BOTTOM)
    music.ba_ding.play()
    info.change_score_by(1)
def initializeHeroAnimations():
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
def createPlayer(player2: Sprite):
    player2.ay = gravity
    scene.camera_follow_sprite(player2)
    controller.move_sprite(player2, 100, 0)
    player2.z = 5
    info.set_life(3)
    info.set_score(0)
def initializeLevel(level2: number):
    global playerStartLocation
    effects.clouds.start_screen_effect()
    playerStartLocation = tiles.get_tiles_by_type(assets.tile("""
        tile6
        """))[0]
    tiles.place_on_tile(hero, playerStartLocation)
    tiles.set_tile_at(playerStartLocation, assets.tile("""
        tile0
        """))
    createEnemies()
    spawnGoals()
def hasNextLevel():
    return currentLevel != levelCount
def spawnGoals():
    global coin
    for value7 in tiles.get_tiles_by_type(assets.tile("""
        tile5
        """)):
        coin = sprites.create(img("""
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
                """),
            SpriteKind.Coin)
        tiles.place_on_tile(coin, value7)
        animation.attach_animation(coin, coinAnimation)
        animation.set_action(coin, ActionKind.Walking)
        tiles.set_tile_at(value7, assets.tile("""
            tile0
            """))
heroFacingLeft = False
coin: Sprite = None
playerStartLocation: tiles.Location = None
flier: Sprite = None
bumper: Sprite = None
mainCrouchRight: animation.Animation = None
mainCrouchLeft: animation.Animation = None
mainJumpRight: animation.Animation = None
mainJumpLeft: animation.Animation = None
mainRunRight: animation.Animation = None
mainRunLeft: animation.Animation = None
flierIdle: animation.Animation = None
flierFlying: animation.Animation = None
mainIdleRight: animation.Animation = None
mainIdleLeft: animation.Animation = None
doubleJumpSpeed = 0
canDoubleJump = False
coinAnimation: animation.Animation = None
currentLevel = 0
levelCount = 0
gravity = 0
pixelsToMeters = 0
invincibilityPeriod = 0
hero: Sprite = None
music.play(music.create_song(hex("""
        0078000408010201001c000f05001202c102c201000405002800000064002800031400060200042d0008000c00020f250c001000011410001400030c222914001800030f202418001c0001141c00200005080d11272a06001c00010a006400f40164000004000000000000000000000000000000000209000c001000040c112229
        """)),
    music.PlaybackMode.UNTIL_DONE)
hero = sprites.create(img("""
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
        """),
    SpriteKind.player)
# how long to pause between each contact with a
# single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 11.1 * pixelsToMeters
scene.set_background_image(img("""
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
    """))
initializeAnimations()
createPlayer(hero)
levelCount = 12
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
info.start_countdown(90)
# set up hero animations

def on_on_update():
    global heroFacingLeft
    if hero.vx < 0:
        heroFacingLeft = True
    elif hero.vx > 0:
        heroFacingLeft = False
    if hero.is_hitting_tile(CollisionDirection.TOP):
        hero.vy = 0
    if controller.down.is_pressed():
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.Walking)
        else:
            animation.set_action(hero, ActionKind.Walking)
    elif hero.vy < 20 and not (hero.is_hitting_tile(CollisionDirection.BOTTOM)):
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.Walking)
        else:
            animation.set_action(hero, ActionKind.Walking)
    elif hero.vx < 0:
        animation.set_action(hero, ActionKind.Walking)
    elif hero.vx > 0:
        animation.set_action(hero, ActionKind.Walking)
    else:
        if heroFacingLeft:
            animation.set_action(hero, ActionKind.Walking)
        else:
            animation.set_action(hero, ActionKind.Walking)
game.on_update(on_on_update)

# Flier movement

def on_on_update2():
    for value8 in sprites.all_of_kind(SpriteKind.Flier):
        if abs(value8.x - hero.x) < 60:
            if value8.x - hero.x < -5:
                value8.vx = 25
            elif value8.x - hero.x > 5:
                value8.vx = -25
            if value8.y - hero.y < -5:
                value8.vy = 25
            elif value8.y - hero.y > 5:
                value8.vy = -25
            animation.set_action(value8, ActionKind.Walking)
        else:
            value8.vy = -20
            value8.vx = 0
            animation.set_action(value8, ActionKind.Walking)
game.on_update(on_on_update2)

# Reset double jump when standing on wall

def on_on_update3():
    global canDoubleJump
    if hero.is_hitting_tile(CollisionDirection.BOTTOM):
        canDoubleJump = True
game.on_update(on_on_update3)

# bumper movement

def on_on_update4():
    for value9 in sprites.all_of_kind(SpriteKind.Bumper):
        if value9.is_hitting_tile(CollisionDirection.LEFT):
            value9.vx = Math.random_range(30, 60)
        elif value9.is_hitting_tile(CollisionDirection.RIGHT):
            value9.vx = Math.random_range(-60, -30)
game.on_update(on_on_update4)

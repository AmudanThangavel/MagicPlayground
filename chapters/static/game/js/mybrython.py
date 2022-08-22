from browser import window, aio
gem = 0
coin = 0
door = 0
is_coin = True
front_step_has_road = False
right_step_has_road = False


def variables_name():
    global gem
    global coin
    global door
    global is_coin
    global front_step_has_road
    global right_step_has_road
    try:
        gem = window.gem
    except:
        pass

    try:
        is_coin = window.isCoin
    except:
        pass
    try:
        coin = window.coin
    except:
        pass

    try:
        door = window.door
    except:
        pass

    try:
        is_coin = window.isCoin
    except:
        pass

    try:
        front_step_has_road = window.front_step_has_road
    except:
        pass

    try:
        right_step_has_road = window.right_step_has_road
    except:
        pass


variables_name()


correct_squares = window.correctSquares


async def move_down():
    await aio.sleep(1)
    window.moveDown()
    variables_name()


async def move_up():
    await aio.sleep(1)
    window.moveUp()
    variables_name()


async def move_left():
    await aio.sleep(1)
    window.moveLeft()
    variables_name()


async def move_right():
    await aio.sleep(1)
    window.moveRight()
    variables_name()


async def toggle_switch():
    await aio.sleep(1)
    window.toggleSwitch()
    variables_name()


async def collect_sword():
    await aio.sleep(1)
    window.collectSword()


async def deposit_swords():
    await aio.sleep(1)
    window.depositSwords()


def collect_gem():
    window.collectGem()


async def jump():
    await aio.sleep(1)
    window.jump()
    variables_name()


def collect_coin():
    window.collectCoin()


def collect_basket():
    window.collectBasket()


def load_character(n):
    window.loadCharacter(n)


def open_door():
    window.openDoor()


async def navigate():
    await aio.sleep(1)
    window. navigate()
    variables_name()


async def main():
    print(is_coin)

aio.run(main())

---
title:  "Some random side projects that will probably never be finished..."
tags: side-projects development updates
category: Software-Development
---

Once every 6 months is better than once in forever... right?

## Side Projects

Often, when I come up with an idea that interests me, I'll want to dive in and try it out right away. I don't usually do so with the intent of bringing them to the light of day, or producing a final public project from them - I just try to start working on them personally as they seem like an interesting task which can keep me occupied and perhaps help me pick up new skills.

I feel like it benefits me through getting me used to starting projects; sometimes it can be a little difficult to know where to start; and even more so to start in a sustainable way that can continue during the project. In starting these side projects, I can try to expirement with my approaches and through various attempts hone in on effective and organised ways of structuring different types of projects.

Additionally, it helps introduce me to new technologies - since technology is always evolving, being more adaptable through practice is a good idea; and what better way to practice than diving in to using a new technology on a low/zero stakes project!

You might notice most of these tie in with a videogame of some description - often I'll do a side project because it takes my interest; and since I'm interested in games, that's the sort of thing that I look at :)

Here's a description of just a few 

### Scalable Minecraft Network

Yeah - this one was a bit ambitious.
From my understanding, the majority of Minecraft server networks currently obtain a large number of dedicated servers and have these servers continually run. I was curious as to how viable an approach would be of a server which dynamically scaled using cloud technologies, how much such a thing might cost and how it might be put together. I knew I probably wouldn't get anywhere in the end, but thought I might pick up some knowledge on the journey.

#### Docker

In exploring this, I was able to expirement with utilising Docker containers, currently through a preexisting image, to implement this. It seemed suited, as my goal was having dynamic numbers of servers (creating and destroying containers) able to communicate effectively with eachother (docker hostname-based networking).
I hadn't had much experience with Docker before trying this out, and I'd argue the experience I got in it through trying things out has probably been the most valuable thing I've gotten from this side project so far.

#### Python

One thing to note is that a network like this isn't going to work purely with gameservers - there needs to be a way to communicate with Docker in order to create new containers and destory old ones - which is where an additional python application comes in. The servers connect via websockers (using a plugin on the gameserver side), propogating events to each server which are handled by each server as needed in order to move users around, create new servers etc.

Here's a snippet of the code used to allow players to join the matchmaking queue.

```python

@sio.on('matchmaking:join_matchmaking_queue')
async def join_matchmaking_queue(sid,data):
    player = Player.get_by_uuid(data.get("player_id"))
    queue = MatchmakingQueue.get_by_id(data.get("queue_id"))
    if player and queue:
        if queue.has_player(player):
            return False, "Already in queue"
        if queue.check_eligibility_to_join(player):
            queue.add_player(player)
            return True, "Joined queue."
        else:
            return False, "Player does not meet conditions."
    else:
        return False, "Player or Queue does not exist."
```

The named event would be emitted by the proxy server a player is connected to; which would be prompted to do so via in game actions. The backend server would then manage the queue, and propogate matches to each server which has a player within that match, allowing players on different proxy servers to queue together!

This project is one I'll probably keep looking at as time goes on; I don't expect it to become public in the near future, however I enjoy expirementing with the infrastructure challenges!

### PDDL - Hearthstone Hunter Puzzle

This one ties more into the studies I'd been doing at university over the last academic year. A puzzle was added to Hearthstone which involved fufuilling a chain of barters such that everyone was satisifed - this chain consisted of many different steps, however. Seeing this problem, I thought that an AI planner might effectively be able to solve it, and as a result attempted to convert the problem to a PDDL domain.

```pddl
(:action make-purchase
    :parameters (?m - buyer ?inType - item ?outType - item)
    :precondition (and 
        (not-buyout)
        (has-trade ?m ?inType ?outType)
        (>= (inventory ?inType) (in-amount ?m ?inType))
        (> (trade-capacity ?m ?inType ?outType) 0)
    )
    :effect (and 
        (decrease (trade-capacity ?m ?inType ?outType) 1)
        (decrease (inventory ?inType) (in-amount ?m ?inType))
        (increase (inventory ?outType) (out-amount ?m ?outType))
        (increase (sales) 1)
        (increase (merchant-sales ?m) 1)
    )
)
```

The above is an excerpt of the PDDL I used to define the action of making a purchase of a single item.

When trying things out, it interestingly appeared that the AI planners I was using were unable to solve the problem, despite a human having found a valid solution during my work. This could be due to one or more typos in the definition, due to me misdefining an element of the problem, or that the problem is too complex for the planners I was using to solve.
Irregardless; it aided my knowledge of PDDL going into an examination in the week after; as well as entertaining me for an evening.

## Conclusion

Even though I may not have published or revealed that much of what I've personally been working on, I feel like it's helped me develop quite a lot along the way. I sometimes worry that my hesitance to publish these things might impact upon future prospects - but I'm hoping my ability to explain personal projects and the abilities I've learned along the way might still help.
Hopefully, I'll have something worthy of being shared with the world soon - but until then, I'll keep working away!

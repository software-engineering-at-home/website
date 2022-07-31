# 📥 Make your queues visible

This rather dry seeming subject is super important. We are burdened by glorious purpose! To do the things. The things the things the things... if only we could remember what they are. If only we could *see* what they are. 

Todo lists are a type of queue. A list of things, ordered in the order they come out of your head, tasks that may need to be done, or not; but they're queued up on a piece of paper, or a whiteboard, or as items in your phone's memory.

| TODO list    |
| ------------ | 
| Shopping     |
| Bins out     |
| Doctors      |
| Cinema       |
| Swimming     |

If we were being super organised, this could be refined and ordered:

| Day       | Time | TODO     |
| --------- | ---- | -------- | 
| Monday    | 6pm  |Shopping  |
| Tuesday   | 7am  | Bins out |
|           | 3pm  | Doctors  |
| Wednesday | 7pm  | Cinema   |
|           | 8pm  | Swimming |

(Don't ask how we're doing Cinema AND Swimming on Wednesday, we might have a conflict!)

## 🚋 Physical Queues

There are other more physical queues as well, queues in line at the supermarket, or post office.  Boxes awaiting click-and-collect. Traffic queues trying to get out of the carpark to head home.

Back to the more esoteric - what about all of the cars already parked outside a store? What about the number of outstanding orders that haven't been fulfilled? What about the record of errors for bad website requests on the hard drive of your server?

Queues aren't just things waiting to be done; they are countable lists of things which grow and shrink; they are buffers that prevent us running on empty. The food in your fridge is a type of queue; its organised roughly by freshness, and expiry dates, and acts as a buffer, so when you're hungry, you don't have to drive down to the shops or order fast food every time you're hungry.

## ✏️ Lets be explicit

What is a queue then? Let's say that common properties of all queues are:

- A queue is an ordered list of items
- A queue is countable - it has an integer length
- A queue has a front - the next thing to do
- A queue has a back - the last thing to do
- A queue ideally has a name

## 🧾 Ordered List of Items

A queue is an ordered list of items - the items should be similar, and countable. An empty queue has zero items in. A queue of length 5 has five items in it. Items might be people, packages, cars in a carpark, tickets on a kanban board, sweets in a packet of sweets.

Ok, lets address the contradiction in those examples - we don't think of a carpark or a pack of sweets as an ordered list - at least not until a car drives away, or a sweet is pulled out. The order reveals itself when the fated sweet is pulled from the bag, so perhaps the order is unknown, but we know that when the bag is empty, its time for another bag of sweets right?

What about the carpark? Cars can leave at the same time, and eventually get bottlenecked by a highway, why do we even care about who's in the carpark anyway? Well, its fair to say, if you've got two exits to a car park, cars can in theory leave twice as fast than having a single exit - but even if appears that the cars leave at the same time, we could always pick a winner based on distance from the store entrance, or customer information counter, and put them in order. I'm not going to argue the physical locality of items in a queue anymore then that, but being able to classify items as a queue is hugely helpful in analysing bottlenecks and building buffers of the right sizes to efficiently plan and organise delivery of useful work.

## 🧮 Countable Items

People stood in a queue is the easy example; provided they're not scrambling in a hoard towards the store for a seasonal sale. There might be twelve customers in a queue, waiting to scan out their shopping, the customers might have an entourage of partners, children, dogs, prams, trolleys, baskets, but they roughly countable as a series of trasactions, queries, and beeps waiting to occur. The items they carry with them are also a queue of sorts, once unpacked onto the checkout, one customer might have thirty items, which they scan in sequence, until they're ready to pack their bags and pay the total. 

Queues form everywhere.

The key thing to consider reading this article - can you see them?

## 📍 Name and Purpose

A queue ideally has a name - or at least a purpose - for example, we've covered queue to check out at the super market, or a queue to talk to customer services. Usually behind each queue is an intended goal worth waiting for, or an unrevealed truth, such as trash thrown into a bin waiting to be removed from the house.

There are 43 items of trash added to the black bin over the past 4 days, the bin bag is full, and needs emptying. The name and purpose of the queue in this example is the bin 🗑️. 

## 💡 So why make our queues visible?

This is very much the point of process design; you have a goal you want to achieve. Information comes in, processes are followed, work comes out. We measure success by doing things; we ask ourselves "Did we achieve what we set out to do?". Queues help us understand getting from A-B, maybe that means going through A-Z before arriving at B - but at each stage, we can count, and measure the things still needed to be done. The number of key strokes to finish writing this article, the number of words still to be read, the number of unfinished, or unreleased articles. These are all types of queues that help us manage, plan, and deliver against work.

So have a think:

- What queues exist around you?
- What queues are important to you and your processes?
- What unfinished work is queueing up that you can't see?
- What buffers could you introduce to help streamline delivery?
- What trash queues are silently forming that need cleaning up?


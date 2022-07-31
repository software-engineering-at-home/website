# 🎫 Kanban

Kanban in the context of Software Engineering is the process of pulling work in incrementally and swarming based on the position of work. Kanban revolves around the position of work on a Kanban board; a visual representation of work state often seen in ticket management systems such as Azure DevOps, Github Projects and Jira.

The important principle of Kanban, is that when a work item is moved, it leaves a gap, revealing a location and instruction; a request for more work. In this regard, Kanban forms a pull based system of delivery, focused on delivering value in flow before creating new work.

In the Kanban process, an understanding of queue theory is important - queues are important in managing flow, and a founding principle of Kanban is ["make your work visible"](./003-make-your-queues-visible.md). Hidden work is carried by individuals from place to place, but physical work can be seen in progress, moving around the factory. In Software, the visual representation of this is ticket management boards, where we can see the work flowing from conception, through to development, release, and delivery. 

## 📋 The Kanban board

Kanban boards historically have been whiteboards in offices, organised in columns known as swimlanes, which describe the state of work in a process that flows from source to destination.

As digital systems have become better at modelling the flow of work, and teams have moved to remote, online, working - Kanban boards are now more commonly found as part of workflow management tools, also known as ticket management systems.

Presented as a table; it is usual for teams to gather daily, a meeting known as standup, infront of a Kanban board where each visible item is discussion from right to left. Each item is discussed in the context of the deliverable goal, who is working on the ticket, and what if anything can be done to move the work along its path to delivery - usually a released software increment.

| Next up | In progress | In Test | In Review | UAT    | Released | Closed |
| ------- | ----------- | ------- | --------- | ------ | -------- | ------ |
| Item G  | Item D      |         |           | Item C | Item B   | Item A |
| Item H  | Item E      |         |           |        |          |        |
|         | Item F      |         |           |        |          |        | 

## 🏉 Differences and overlap with Scrum

Scrum often uses a Kanban board to track work, and as part of standups. This is because [Scrum](./001-scrum.md) has formal ceremonies to plan and schedule work, and a visual board is a great way to track work in flow. Kanban as a methodology however is designed to be free-flowing, pulling work on a just-in-time basis. For example, perhaps the team has decided that there should be 3-6 planned items in Next up, ready for the team to pick up - if that number drops to 3 or below, that triggers meta-work to plan and refine new tickets from the backlog. As teams optimise their flow, they may build more process, or relax existing processes to reduce waste, and prioritise delivery.

In restrictive Scrum teams, the team might abritrarily wait until the next planning cycle to either refine more work, or worse, potentially run out of work for the team to *sprint* against. As you can imagine, this creates tension and waste in the team - where as Kanban is more relaxed in this regard; there is work to be done, the next work is available.

A hybrid model of the two, known as Scrumban combines the regularity and predictability of scrum ceremonies, such as planning sessions with product owners, and demos with stakeholders, but allows delivery and refinement to operate independently. In Kanban and Scrumban, measures of success, and velocity are then calcuable not by a burn-down chart, but by a [cumulative flow diagram](./004-culmulative-flow-diagrams.md) showing the 

## 📖 Definitions of Kanban from other sources

### Kanbanize

>Kanban is a workflow management method that helps organizations manage and improve work systems.

### Value Flow Quality

>Kanban was first developed in the 1950s in Toyota by Taiichi Ohno as a means to assist ‘just in time’ production. The basic idea was to prevent overproduction; the waste represented by having large piles of inventory lying around before there was any need for them. - Value Flow Quality

### Wikipedia

>Kanban (Japanese: カンバン and Chinese: 看板, meaning signboard or billboard) is a scheduling system for lean manufacturing



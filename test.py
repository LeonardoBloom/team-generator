import random
import math

def add_people(num_people):
    '''Adds people's names according to # of participants :) '''
    participant = [] # array to hold participants
    while True:
        # adds {num_people} participants to array
        for names in range(num_people):
            name = input(f"Participant #{names+1}: ")
            participant.append(name)
        for num in participant:
            print(num)
        confirm = input("Is this list correct? [y/n] ")
        if confirm[0] == 'y' or confirm[0] == 'Y':
            confirm = ''
            break
        particpant = []
    # return array with participants
    return participant

# Loop to ask and confirm number of players
while True:
    num_people = int(input("How many people are playing? "))
    confirm = input(f"Are you sure {num_people} are playing? [y/n] ")
    # if confirmation = yes then break out of this loop
    if confirm[0] == 'y' or confirm[0] == 'Y':
        confirm = ''
        break
    confirm = ''

# get array for the participants
participants = add_people(num_people)

# shuffle the array of participants (very optional breh)
random.shuffle(participants)
print(participants)

#participants = ["Leo", "Maddy", "Lucy", "Herald", "Jimmy"]

teams = int(input("How many teams? "))
# takes the ceiling of the team size in case of floating point
team_length = math.ceil(len(participants) / teams)
print(f"\nOkay, there can be {team_length} people in each team")

# splits the participants into equal-sized teams [ALGO_2]
'''
d = {}
for x in range(0, teams-1):
    teamer = ''
    for y in range(team_length):
        if len(participants) == 1:
            teamer += participants.pop(0)
            break
        else:
            teamer += participants.pop(0) + ','
    d[f"Team {x+1}"] = teamer 
print(d)
participants = ["Leo", "Maddy", "Lucy", "Herald", "Jimmy"] 
'''

def distribute_members(participants):
    ''' Splits the participants into equal-sized teams [ALGO_2] '''
    b = {}
    # Initialize a dictionary with team numbers and empty teams
    for x in range(0, teams):
        b[f"Team {x+1}"] = None
    # while participants is not empty, add to each team:
    while len(participants) > 0:
        for x in range(0, teams):
            # because the teams are initially "empty", replace None
            #with the first team member in that team
            if b[f"Team {x+1}"] == None:
                b[f"Team {x+1}"] = participants.pop(0)
            else:
                b[f"Team {x+1}"] += ',' + participants.pop(0)
            # because of .pop(), when participant array is empty then
            #exit loop bruh
            if len(participants) == 0:
                break
    print(b)
    return b

for x,y in distribute_members(participants).items():
    print(f"{x}: {y}")

'''
# splits the dictionary names and prints them separately
for x,y in b.items():
    thing = y.split(',')
    for i in thing:
        print(i)
'''
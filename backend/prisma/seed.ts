/// <reference types="node" />

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      username: 'Alice',
      firstName: 'Alice',
      lastName: 'Prisma',
      password: '123456',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      username: 'Bob',
      firstName: 'Bob',
      lastName: 'Dole',
      password: 'qwerty',
    },
  });

  const bobMember = await prisma.member.upsert({
    where: { userId: bob.id },
    update: {},
    create: {
      userId: bob.id,
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@email.com' },
    update: {},
    create: {
      email: 'charlie@email.com',
      username: 'Charlie',
      firstName: 'Charlie',
      lastName: 'Brown',
      password: 'password',
    },
  });

  const charlieMember = await prisma.member.upsert({
    where: { userId: charlie.id },
    update: {},
    create: {
      userId: charlie.id,
    },
  });

  const aliceMember = await prisma.member.upsert({
    where: { userId: alice.id },
    update: {},
    create: {
      userId: alice.id,
      posts: {
        create: [
          {
            postType: 'text',
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            votes: {
              create: [
                { memberId: charlieMember.id, voteType: 'UPVOTE' },
                { memberId: bobMember.id, voteType: 'UPVOTE' },
                { memberId: bobMember.id, voteType: 'UPVOTE' },
              ],
            },
            comments: {
              create: [
                { text: 'Great post!', memberId: bobMember.id },
                { text: 'Super!', memberId: charlieMember.id },
              ],
            },
          },
          {
            postType: 'text',
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            votes: {
              create: [
                { memberId: charlieMember.id, voteType: 'UPVOTE' },
                { memberId: bobMember.id, voteType: 'UPVOTE' },
              ],
            },
            comments: {
              create: [
                { text: 'Great post!', memberId: bobMember.id },
                { text: 'Super!', memberId: charlieMember.id },
              ],
            },
          },
          {
            postType: 'text',
            title: 'Third post on the forum',
            content: 'Third post on the forum about something',
            votes: {
              create: [{ memberId: charlieMember.id, voteType: 'UPVOTE' }],
            },
            comments: {
              create: [{ text: 'Not so great', memberId: bobMember.id }],
            },
          },
        ],
      },
    },
  });

  console.log({ alice, aliceMember });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
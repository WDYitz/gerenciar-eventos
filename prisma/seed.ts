import { prisma } from "../src/libs/prisma"

const seed = async () => {
  await prisma.event.create({
    data: {
      id: 'a395c6b6-0d04-4714-91a2-66e3bd25c3c3',
      title: 'React Week',
      slug: 'react-week',
      details: 'Um evento p/ devs apaixonados(a) por React',
      maximunAttendees: 120
    }
  })

}

seed().then(() => {
  console.log('Database seeded')
  prisma.$disconnect()
})
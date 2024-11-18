import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categoryes = [
    { category_name: 'Action', id: '00000000-0000-0000-0000-000000000001' },
    { category_name: 'Drama', id: '00000000-0000-0000-0000-000000000002' },
    { category_name: 'Philosophy', id: '00000000-0000-0000-0000-000000000003' },
    { category_name: 'Terror' },
    { category_name: 'Scifi' },
  ];

  const books = [
    {
      title: '1984',
      author: 'George Owell',
      categoryId: '00000000-0000-0000-0000-000000000001',
      image: '1984.jpg',
    },
    {
      title: 'Arquitetura de Software',
      author: 'George Owell',
      categoryId: '00000000-0000-0000-0000-000000000001',
      image: 'ArquiteturaDeSoftware.jpg',
    },
    {
      title: 'Home Apothecary',
      author: 'George Owell',
      categoryId: '00000000-0000-0000-0000-000000000001',
      image: 'HomeApothecary.jpg',
    },
    {
      title: 'Meditações',
      author: 'Marco Aurélio',
      categoryId: '00000000-0000-0000-0000-000000000003',
      image: 'Meditacoes.jpg',
    },
    {
      title: 'Pai Rico Pai Pobre',
      author: 'Marco Aurélio',
      categoryId: '00000000-0000-0000-0000-000000000003',
      image: 'PaiPobrePaiRico.jpg',
    },
    {
      title: 'Paradise Lost',
      author: 'Ze colmeia',
      categoryId: '00000000-0000-0000-0000-000000000003',
      image: 'ParadiseLost.jpg',
    },
    {
      title: 'Pior dia de Todos',
      author: 'Ze colmeia',
      categoryId: '00000000-0000-0000-0000-000000000003',
      image: 'PiorDiaDeTodos.jpg',
    },
    {
      title: 'Simplesmente Lean',
      author: 'Ze colmeia',
      categoryId: '00000000-0000-0000-0000-000000000003',
      image: 'SimplesmenteLean.jpg',
    },
  ];

  for (const category of categoryes) {
    await prisma.bookCategory.create({
      data: category,
    });
  }

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

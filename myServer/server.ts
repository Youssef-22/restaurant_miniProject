import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fs from 'fs';
import path from 'path';
import fastifyStatic from '@fastify/static';


interface Restaurant {
    name: string;
    description: string;
    image: string;
  }

const server = fastify();

const restaurants2 = [
  {
    name: 'Restaurant 1',
    description: 'Description 1',
    image: "http://image1"
  },
  {
    name: 'Restaurant 2',
    description: 'Description 2',
    image:"http://image2"
  },
];

server.register(fastifyStatic, {
    root: path.join(__dirname, 'assets'),
    prefix: '/assets/', // optional: default '/'
  })
  



let restaurants3: Restaurant[] = [];

fs.readFile('reastaurant.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  restaurants3 = JSON.parse(data);
})

server.register(fastifyCors, {
    origin: ['http://localhost:3000']
});


server.get('/restaurants', async (request, reply) => {
  return restaurants3;
});

server.listen(4000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Group details

- T.E.M.A.P. Ekanayake |
	IT21344824 |
	IT21344824@my.sliit.lk |

- Jayawardhana  J. R. K. B |
	 IT21352294 |
	 it21352294@my.sliit.lk |
	

-  Ranaweera C. |
	 IT21271250 |
	 it21271250@my.sliit.lk |
	

-  Hemashi T.G.B |
	 IT21290060 |
	 it21290060@my.sliit.lk | 
	

## Getting Started

First, if database data is changed run :

```bash
npm run typegen

```

then to install dependencies  

```bash
npm install

``` 

then to start 

```bash
npm run dev 

``` 


then create a new terminal and sign in to stripe 

```bash
stripe login

``` 
then go to the provided link and grant access

then run follwing command to listen to webhook so when the trancation is done then create a order (don't cloase the terminal)

```bash
stripe listen --forward-to localhost:4242/webhook

``` 

To go to client  [http://localhost:3000](http://localhost:3000)  , 
To go to admin panal [http://localhost:3000/studio](http://localhost:3000/studio) 


## Deploy on Vercel


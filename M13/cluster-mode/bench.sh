URL=http://localhost:3000

npx autocannon http://localhost:3000 -m POST -W [ -c 1 -d 3 ] -c 500 -p 10 --renderStatusCodes

#cat log.txt | grep 73619 | wc -l

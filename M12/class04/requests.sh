echo $'\n\n [requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "vingador", "age": "80"}'

echo $'\n\n [requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "vingador", "age": "18"}'

echo $'\n\n [requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "v", "age": "50"}'

echo $'\n\n [requesting: all errors]'
curl -i localhost:3000 -X POST --data '{"name": "a", "age": "15"}'

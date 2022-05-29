#!
yarn
yarn build
cd ..
ls | grep -v col_client_nginx| xargs rm -rf
mv col_client_nginx/build/* .

git add *
echo \"`date`\" | xargs git commit -m
git push origin
#!
yarn
yarn build
cd ..
ls | grep -v client| xargs rm -rf
mv client/build/* .

git add *
echo \"`date`\" | xargs git commit -m
git push origin
if [ "$TRAVIS_SECURE_ENV_VARS" = "true" ];
then
echo '{"token": ' > ~/.tsdrc
echo "\"$TSD_GITHUB_TOKEN\"" >> ~/.tsdrc
echo '}' >> ~/.tsdrc
fi


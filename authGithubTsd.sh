if [ "$TRAVIS_SECURE_ENV_VARS" = "true" ];
then
echo '{ "config": {"github-oauth":{"github.com": ' > ~/.tsdrc
echo "\"$TSD_GITHUB_TOKEN\"" >> ~/.tsdrc
echo '}}}' >> ~/.tsdrc
fi


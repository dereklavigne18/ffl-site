# Download redis and unpack
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz

# Build the binary
cd redis-stable
make

# Add Redis to the machine's path
sudo make install

# Setup firewall rule to protect Redis - should probably put this in its own script

# Add authentication
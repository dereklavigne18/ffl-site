path=~/Downloads/redis-stable
tar_path = ~/Downloads/redis-stable.tar.gz

# Download redis and unpack. TODO Allow the save file path to be input
(
  cd ~/Downloads
  curl -O http://download.redis.io/redis-stable.tar.gz
  tar xvzf $tar_path
)

# Build the binary
cd $path
make

# Add Redis to the machine's path
sudo make install

# TODO: Setup firewall rule to protect Redis - should probably put this in its own script

# TODO: Add authentication

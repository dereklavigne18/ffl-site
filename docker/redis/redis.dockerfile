FROM redis:5.0.5

COPY redis-start.sh /redis/
COPY interleague-matchups.json /redis/

CMD ["sh", "/redis/redis-start.sh"]

delete * from helo_posts
where id = $1 
returning * from helo_posts;
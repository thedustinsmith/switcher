# The Sound Switcher

A project to control rasberry pi's gpio's to switch my home speakers on and off

## Repository Quirks

Because I know I'm going to look back on this repository and ask a bunch of questions of why I did things the way I did them.  Here are a few notes

* I struggled a ton with gpio libraries, until I figured out that when accessing the gpio port, most libraries automatically switch the port on.  Most of the alternative gpio libraries will work knowing that information
* Yes the structure of this is weak, but it's lite.  I'd like it to be even lighter.  If I get the motivation to get rid of express, I wouldn't have that either.  The raspberry pi doesn't have a ton of resources to work with.  The lighter the better.
* To use node 4.0.0 on the pi, I had to download the armv6 tar and extract it.  There's a blog post out there somewhere.
* No bower.  I don't want to install bower on the pi

# AccedoTV assignment - Media application

---

## Application flow

I decided to create two seperate pages to create a bit smoother and split user flow. The user should have all player controls functionalities and also be able to remove /
change video from the `Open playlist` dropdown. Below you can see which routes that exists:

1. The `/` (home) page contains the users playlist with the options of adding and removing videos from the playlist. The user can also click play on
   the selected video to get to the video player of that specific video.

2. The `/watch/[title]` page contains the actual video player where the user can watch the selected video.

To add a new video to the playlist the user needs to use a existing video source link (all sources can be found in the `data` folder)

## How to run the code locally

1. Clone the repository to your computer.
2. Navigate into the cloned folder and run `npm install`
3. Run the code by running `npm run dev`

## Built With

- [Typescript](https://www.javascript.com) - Frontend language
- [Vite](https://vitejs.dev/) - Frontend tooling
- [React](https://react.dev/) - Frontend framework
- [TailwindCSS](https://tailwindcss.com/) - Easy CSS tool for quick mocking / MVPs.
- [RadixUI](https://www.radix-ui.com/) - Quick way of getting a nice dropdown component.
- [clsx](https://github.com/lukeed/clsx) - A tiny (234B) utility for constructing className strings conditionally.
- [twMerge](https://github.com/dcastil/tailwind-merge) - Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.

## Notes

- I moved the different assets into the `Icons.tsx` component to make it play better / easier with TailwindCSS (JSX).
- Inside of `App.tsx` I added a small localstorage set method with comments to keep the demo consistent, but as the comments states it's a not production solution in anyway.

---

# Assignment

## Media player

Create a React media application which is capable of doing basic video player functionalities.

Note: Having proper design is always nice to have but is not a must. We are mainly curious about the core logic of the application. Please feel free to have bare minimum styling for the elements.

### Playlist

The player has a default playlist of 3 media by default. To create the playlist pick any 3 of the publicly available media (https://gist.github.com/jsturgis/3b19447b304616f18657).
In addition to the default playlist the player should also allow the user to add/remove urls. Error handling is not necessary, we can assume that the user always provides a url with valid media. All the items from the playlist should be visible to the user and the currently played one should be in bold.

- Create a list of media from the playback
- Highlight the currently played media by making the text bold

#### Adding media to playlist

It should add the url to the playlist upon pressing enter in the input or clicking on the submit button

- Create a text input
- Create a submit button

#### Removing media from the playlist

- Create a remove button next to each of the media items

### Player controls

#### Functionalities

- Go to previous media (`assets/previous.svg`)
  - Go to the previous item from the playlist. Goes to the last media if the player was on the first.
- Fast backwards 10 seconds (`assets/backward.svg`)
  - Rewind the media by 10 seconds
- Play/pause button (`assets/play.svg` and `assets/pause.svg`)
  - The buttons should be in the same position in the middle of the controls
  - Show play button when the player is paused and show pause button when the content is playing
- Fast forwards 10 seconds (`assets/forward.svg`)
  - Advances time by 10 seconds
- Go to next media (`assets/next.svg`)
  - Go to the next item from the playlist. Goes to the first media if the player was on the last.

#### Design

The controls should have unique icons. Please find them in the `assets/` folder.

##### Media is playing

```
| ⏮ | ⏪ | ⏸ | ⏩ | ⏭ |
```

##### Media is paused

```
| ⏮ | ⏪ | ⏵ | ⏩ | ⏭ |
```

### Submission

Your solution can be emailed back to us as a Zip file, or uploaded to any git solution you'd like with a link to the public/private repository.

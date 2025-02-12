export function getData() {
  const data = localStorage;
  const keys = Object.keys(data);
  const returning_array = [];
  keys.map((item) => {
    const parsedData = { [item]: JSON.parse(data[item]) };
    returning_array.push(parsedData);
  });
  return returning_array;
}

export function randomId() {
  const String =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id = "";
  for (var i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * String.length);
    id += String[randomIndex];
  }
  return id;
}

export async function createNewPost(data, key) {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, JSON.stringify(data));
      resolve("done");
    } else {
      reject("error");
    }
  });
}

export async function createNewComment(data, key) {
  return new Promise((resolve, reject) => {
    let unparsedData = localStorage.getItem(key);
    if (unparsedData != null) {
      const localData = JSON.parse(unparsedData);
      localData.comments.push(data);
      localStorage.setItem(key, JSON.stringify(localData));
      resolve("done");
    } else {
      reject("error");
    }
  });
}

export function getDataById(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

export function deletePostById(key) {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      resolve("done");
    } else {
      reject("error");
    }
  });
}

export async function deleteCommentById(postKey, commentKey) {
  return new Promise((resolve, reject) => {
    const data = JSON.parse(localStorage.getItem(postKey));
    data.comments.map((item) => {
      if (item.id === commentKey) {
        const index = data.comments.indexOf(item);
        data.comments.splice(index, 1);
        localStorage.setItem(postKey, JSON.stringify(data));
        resolve("done");
      } else {
        reject("error");
      }
    });
  });
}

export function initializeDatabase() {
  const data = sessionStorage.getItem("first-time");
  if (data == null && localStorage.length === 0) {
    sessionStorage.setItem("first-time", true);
    const storedData = {
      id: randomId(),
      author: "Veerendra",
      title: "Getting Started With the App",
      description:
        "This is a simple app to view the posts and comments web component in action",
      comments: [
        {
          id: randomId(),
          replying: "Veerendra",
          author: "Anonymous",
          description: "Welcome to comments",
        },
        {
          id: randomId(),
          replying: "Veerendra",
          author: "Veerendra",
          description:
            "Here people can comment on the respective posts, if the author of the comment is not given, it will automatically be Anonymous",
        },
      ],
    };
    localStorage.setItem(randomId(), JSON.stringify(storedData));
  }
}

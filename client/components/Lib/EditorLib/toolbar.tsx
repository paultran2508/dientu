const uploadCallback = (file: File) => {
  console.log(file);
  return new Promise(
    (resolve, reject) => {
      resolve({ data: { link: "https://i.ibb.co/RQqX4J2/Screenshot-from-2022-11-26-12-02-11-png.png" } });
    }
  );

};

const toolbar = {
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  image: {
    uploadCallback: uploadCallback,
    alt: { present: true, mandatory: true },
  },
}
export default toolbar
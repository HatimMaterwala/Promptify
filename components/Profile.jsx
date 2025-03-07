import Promptcard from "./Promptcard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-[90%] mt-5 m-auto">
      <div className="m-4">
        <h1 className="text-3xl font-bold">{name} Profile</h1>
        <p className="mt-3 text-xl">{desc}</p>

        <div className="mt-5 flex justify-start flex-wrap gap-8">
          {data.slice().reverse().map((post) => {
            return (
              <Promptcard
                key={post._id}
                post={post}
                handleEdit={() => {
                  handleEdit && handleEdit(post);
                }}
                handleDelete={() => {
                  handleDelete && handleDelete(post);
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Profile;

import { faker } from "@faker-js/faker";

const createRandomUser = () => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    hash: faker.internet.password(),
    salt: faker.internet.password(),
    created_by: faker.internet.userName(),
    created_at: faker.date.past(),
    avatar: faker.image.avatar(),
  };
};

export const createRandomGroup = () => {
  const name =
    faker.helpers.arrayElement(["Asc", "Bsc", "Msc"]) +
    "-" +
    faker.datatype.number({ max: 3 }) +
    " G-" +
    faker.random.alpha({ count: 3, casing: "upper", bannedChars: ["G"] });

  const child = faker.datatype.number({ max: 10, min: 0 });
  return {
    id: faker.datatype.uuid(),
    name: name,
    description: faker.lorem.words(10),
    students: faker.datatype.array(faker.datatype.number({ max: 30, min: 0 })),
    root_groups: child > 0 && faker.datatype.uuid(),
    child_count: child ,
    created_by: faker.internet.userName(),
    created_at: faker.date.past().toUTCString(),
    last_update: faker.date.past().toUTCString(),
    locked: false,
    locked_by: faker.internet.userName(),
    locked_at: faker.date.past().toUTCString(),
  };
};

export const getRandomUser = async (length) => {
  return await new Promise((resolve) => {
    const users = [];
    Array.from({ length: length }).forEach(() =>
      users.push(createRandomUser())
    );
    resolve(users);
  });
};

export const getRandomGroups = async (length) => {
  return await new Promise((resolve) => {
    const groups = [];
    Array.from({ length: length }).forEach(() =>
      groups.push(createRandomGroup())
    );
    resolve(groups);
  });
};

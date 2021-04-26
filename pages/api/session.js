import { getActiveCar, getCarById } from '../../controllers/car';
import { getJourneys } from '../../controllers/journey';
import { getUserFromEmail } from '../../controllers/user';
import { getLoginSession } from '../../lib/auth';

export default async function session(req, res) {
  const loginSession = await getLoginSession(req);

  if (!loginSession) {
    const session = { loginSession };
    res.status(200).json({ user: session || null });
    return;
  }

  const email = await loginSession.email;

  const { data: user } = await getUserFromEmail(
    encodeURIComponent(email),
    true,
    req
  );

  if (await user) {
    const { data: journey } = await getJourneys(
      user._id,
      true,
      true,
      req
    );

    // EVO: When car crud will be operationnal
    // TODO: When car crud will be operationnal
    // const { data: car } = await getActiveCar(user._id, true, req);

    // DELETE When car crud will be operationnal -- Car id is the same for everyone for now
    const { data: car } = await getCarById(
      '608045f162ad5e358cb68f8c',
      true,
      req
    );

    const session = {
      session: loginSession,
      user,
      journey,
      car,
    };
    return res.status(200).json({ user: session });
  }

  const session = {
    session: loginSession,
    user,
  };
  res.status(200).json({ user: session || null });
}

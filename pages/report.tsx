import { GetServerSidePropsContext } from "next";
import GameReportDisplay from "components/app/GameReportDisplay";
import { removeCypher } from "lib/encoding";
import Layout from "../components/layout/Layout";

export const Home = ({ target, guesses }: { target: string; guesses: string }): JSX.Element => {
    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <GameReportDisplay
                    words={guesses.split(",").map((word, i) => removeCypher(word, (i + 1) * 17))}
                    target={removeCypher(target, 10)}
                />
            </div>
        </Layout>
    );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { target, guesses } = context.query;

    return {
        props: {
            target: target ? target : "",
            guesses: guesses ? guesses : "",
        },
    };
}

import { format } from "date-fns";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { render } from "@react-email/components";

export type ConfirmationProps = {
  name: string;
  partySize: number;
  date: Date;
  timeSlot: string;
  holdFeePaid: number;
};

export default function ConfirmationEmail({
  name,
  partySize,
  date,
  timeSlot,
  holdFeePaid,
}: ConfirmationProps) {
  const fee = (holdFeePaid / 100).toFixed(2);
  const dateLabel = format(date, "EEEE d MMMM");
  const firstName = name.split(" ")[0] ?? name;

  return (
    <Html>
      <Head />
      <Preview>Your table at Augusto Lisboa is saved</Preview>
      <Body
        style={{
          backgroundColor: "#F5EFE6",
          fontFamily: "Georgia, serif",
          padding: "40px 0",
          margin: 0,
        }}
      >
        <Container
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: 32,
            backgroundColor: "#FAF7F2",
            borderRadius: 16,
          }}
        >
          <Heading
            style={{
              fontSize: 32,
              color: "#3D2B1F",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            See you on {dateLabel}
          </Heading>

          <Section style={{ marginTop: 24, color: "#3D2B1F" }}>
            <Text style={{ fontSize: 16, lineHeight: 1.6 }}>Olá {firstName},</Text>
            <Text style={{ fontSize: 16, lineHeight: 1.6 }}>
              Your table is held. We&apos;ve got{" "}
              <strong>{partySize}</strong>{" "}
              {partySize === 1 ? "seat" : "seats"} at{" "}
              <strong>{timeSlot}</strong> with your name on it.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 1.6 }}>
              Running late or plans changed? Just reply to this email and
              we&apos;ll do our best to keep your table.
            </Text>
            <Text
              style={{
                fontStyle: "italic",
                color: "#7A8A5C",
                fontSize: 16,
                marginTop: 24,
              }}
            >
              &ldquo;Better food, better mood.&rdquo; See you soon.
            </Text>
          </Section>

          <Section
            style={{
              marginTop: 32,
              borderTop: "1px solid #E8D9C4",
              paddingTop: 24,
              fontSize: 12,
              color: "#7A6A5C",
            }}
          >
            <Text style={{ margin: "4px 0" }}>
              Augusto Lisboa · Rua de Belém, 1300 085 Lisboa
            </Text>
            <Text style={{ margin: "4px 0" }}>
              @augustolisboapt · augustolisboa.pt
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export async function renderConfirmationEmail(props: ConfirmationProps) {
  return await render(<ConfirmationEmail {...props} />);
}

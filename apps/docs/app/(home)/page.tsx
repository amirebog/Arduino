import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">Arduino Documentation</h1>

      <p className="max-w-xl mx-auto text-lg leading-relaxed mb-8">
        Arduino is an open-source electronics platform based on easy-to-use hardware and software.
        It is used for building digital devices and interactive projects such as IoT systems,
        robotics, and embedded controllers.
      </p>

      <p>
        Start exploring the documentation in{' '}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>
      </p>
    </div>
  );
}
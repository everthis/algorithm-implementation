function GospersHack(k, n)
{
    let set = (1 << k) - 1;
    let limit = (1 << n);
    while (set < limit)
    {
        DoStuff(set);

        // Gosper's hack:
        let c = set & - set;
        let r = set + c;
        set = Math.floor(((r ^ set) >> 2) / c) | r;
    }
}
